<?php
class Ts3_Client
{
    public static $ServiceURL = "http://ts3.tvm.cn/api/v1";
    public static $AccessKey  = "Access Key";
    public static $SecretKey  = "Secret Key";

    const ErrCodeClientError     = "ClientError";
    const ErrCodeAccessDenied    = "AccessDenied";
    const ErrCodeUnauthorized    = "Unauthorized"; // Need to login and fetch a new access-token
    const ErrCodeInvalidArgument = "InvalidArgument";
    const ErrCodeInternalError   = "InternalError";
    const ErrCodeBukNotFound     = "BucketNotFound";
    const ErrCodeObjNotFound     = "ObjectNotFound";
    const ErrCodeObjExists       = "ObjectAlreadyExists";
    const ErrCodeObjConflict     = "ObjectPathConflict";

    const DEFAULT_PREFIX = "x-ts3-";
    const API_VERSION    = "1.0.0-beta5.1";
    const BYTE_UNIT_MB   = 1048576; // 1MB, 1024 * 1024
    const BLOCK_SIZE     = 8388608; // 8MB
    const CHUNK_SIZE     = 4194304; // 4MB, Range: 2, 4, 8 MB

    public static function ObjectList($bucket, $object)
    {
        $rsp = self::httpRequest("GET", "object/list", $bucket, $object, array());

        if (!isset($rsp->error) && $rsp->kind != "ObjectList") {

            $rsp->error = (object) array(
                "code"    => self::ErrCodeClientError,
                "message" => "Network Connection Exception",
            );
        }

        if (!isset($rsp->items)) {
            $rsp->items = array();
        }

        return $rsp;
    }

    public static function ObjectInfo($bucket, $object)
    {
        $rsp = self::httpRequest("GET", "object/entry", $bucket, $object, array());

        if (!isset($rsp->error) && $rsp->kind != "Object") {

            $rsp->error = (object) array(
                "code"    => self::ErrCodeClientError,
                "message" => "Network Connection Exception",
            );
        }

        return $rsp;
    }

    public static function ObjectPut($bucket, $object, $options = array())
    {
       

        try {

            if (!is_array($options)) {
                throw new Exception("Bad Request", self::ErrCodeInvalidArgument);
            }

            if (!isset($options["file"]) && !isset($options["content"])) {
                throw new Exception("File or Content Not Found", self::ErrCodeInvalidArgument);
            }

            if (isset($options["file"])) {

                if (!file_exists($options["file"])) {
                    throw new Exception("File Not Exists", self::ErrCodeInvalidArgument);
                }

                $options["size"] = filesize($options["file"]);
                $rsp = self::objectMultipartPut($bucket, $object, $options);

            } else {

                $options["size"] = strlen($options["content"]);
                $rsp = self::objectMultipartPut($bucket, $object, $options);
            }

        } catch (Exception $e) {

            $rsp->error = (object) array(
                "code"    => "". $e->getCode(),
                "message" => $e->getMessage(),
            );
        }

        if (!isset($rsp->error) && $rsp->kind == "ObjectMultipart") {
            $rsp->kind = "Object";
        }

        return $rsp;
    }    

    public static function ObjectCopy($bucket, $object, $source)
    {
        $options["content"] = json_encode(array("source" => $source));
        $rsp = self::httpRequest("PUT", "object/copy", $bucket, $object, $options);

        if (!isset($rsp->error) && $rsp->kind != "ObjectCopy") {

            $rsp->error = (object) array(
                "code"    => self::ErrCodeClientError,
                "message" => "Network Connection Exception",
            );
        }

        return $rsp;
    }

    public static function ObjectCopyStatus($bucket, $object)
    {
        $rsp = self::httpRequest("GET", "object/copy-status", $bucket, $object, array());

        if (!isset($rsp->error) && $rsp->kind != "ObjectCopy") {

            $rsp->error = (object) array(
                "code"    => self::ErrCodeClientError,
                "message" => "Network Connection Exception",
            );
        }

        return $rsp;
    }

    public static function ObjectDelete($bucket, $object)
    {
        $rsp = self::httpRequest("GET", "object/del", $bucket, $object, array());

        if (!isset($rsp->error) && $rsp->kind != "Object") {

            $rsp->error = (object) array(
                "code"    => self::ErrCodeClientError,
                "message" => "Network Connection Exception",
            );
        }

        return $rsp;
    }

    private static function objectMultipartPut($bucket, $object, $options = array())
    {
       

        $multipart_blk_count = ceil($options["size"] / self::BLOCK_SIZE);
        $multipart_chk_count = ceil(self::BLOCK_SIZE / self::CHUNK_SIZE);

        $fp = null;

        if (isset($options["content"])) {
            $content = $options["content"];
        }

        $options["content"]           = "";
        $options["multipart-srcsize"] = $options["size"];
        $options["multipart-blksize"] = self::BLOCK_SIZE;
        $options["multipart-chksize"] = self::CHUNK_SIZE;

        $rspst = self::httpRequest("PUT", "object/multipart-put-status", $bucket, $object, $options);
        if (isset($rspst->error) && $rspst->error->code != self::ErrCodeObjNotFound) {
            return $rspst;
        }
        if (!isset($rspst->blocks)) {
            $rspst->blocks = array();
        }

        if (isset($rspst->status) && $rspst->status == "success") {
            return $rspst;
        }

        for ($i = 0; $i < $multipart_blk_count; $i++) {

            $blkstatus = (object) array(
                "status" => "",
                "number" => $i,
                "chunks" => array(),
            );
    
            foreach ($rspst->blocks as $block) {

                if ($block->number == $i) {
                    $blkstatus = $block;
                }
            }

            if ($blkstatus->status == "success") {
                continue;
            }

            for ($j = 0; $j < $multipart_chk_count; $j++) {

                if (in_array($j, $blkstatus->chunks)) {
                    continue;
                }

                $offset = ($i * self::BLOCK_SIZE) + ($j * self::CHUNK_SIZE);
                if ($offset > $options["size"]) {
                    $offset = $options["size"];
                }

                $offlen = self::CHUNK_SIZE;
                if (($offset + $offlen) > $options["size"]) {
                    $offlen = $options["size"] - $offset;
                }

                if ($offlen < 1) {
                    break;
                }

                if (isset($options["file"])) {

                    if (!$fp) {
                        $fp = fopen($options["file"], "r");
                    }

                    if (fseek($fp, $offset, SEEK_SET) !== 0) {
                        throw new Exception("fseek error");
                    }

                    $options["content"] = fread($fp, $offlen);

                } else {

                    $options["content"] = substr($content, $offset, $offlen);
                }

                $options["multipart-blknum"] = $i;
                $options["multipart-chknum"] = $j;            

                $rsp = self::httpRequest("PUT", "object/multipart-put", $bucket, $object, $options);

                if (!isset($rsp->error)) {
                
                    if (!isset($rsp->kind)) {
                    
                        $rsp->error = (object) array(
                            "code"    => self::ErrCodeClientError,
                            "message" => "Network Connection Error",
                        );
                
                    } else if ($rsp->kind != "ObjectMultipart") {
                    
                        $rsp->error = (object) array(
                            "code"    => self::ErrCodeInternalError,
                            "message" => "Server Error",
                        );
                    }
                }

                if (isset($rsp->error)) {
                    break;
                }
            }
        }

        if ($fp) {
            fclose($fp);
        }

        return $rsp;
    }

    private static function httpRequest($method, $action, $bucket, $object, $options = array())
    {
       

        //
        $client = new Ts3_Client_HttpClient(self::$ServiceURL ."/". $action);

        //
        $client->setHeader(self::DEFAULT_PREFIX . "version", self::API_VERSION);

        //
        $client->setHeader(self::DEFAULT_PREFIX . "bucket", $bucket);
        $client->setHeader(self::DEFAULT_PREFIX . "object", base64_encode($object));

        //
        if (!isset($options["content"])) {
            $options["content"] = "";
        }
        $client->setHeader("Authorization", self::sign($options["content"]));
        //echo self::sign($options["content"]);

        //
        if (isset($options["multipart-srcsize"])) {
            $client->setHeader(self::DEFAULT_PREFIX . "multipart-srcsize", $options["multipart-srcsize"]);
            $client->setHeader(self::DEFAULT_PREFIX . "multipart-blksize", $options["multipart-blksize"]);
            $client->setHeader(self::DEFAULT_PREFIX . "multipart-chksize", $options["multipart-chksize"]);
        }

        if (isset($options["multipart-blknum"])) {
            $client->setHeader(self::DEFAULT_PREFIX . "multipart-blknum", $options["multipart-blknum"]);
            $client->setHeader(self::DEFAULT_PREFIX . "multipart-chknum", $options["multipart-chknum"]);
        }

        try {

            $start = time();
            //
            if ($method == "GET") {
                $client->setTimeout(30);
                $client->doGet();
            } else if ($method == "POST") {
                $client->setTimeout(600);
                $client->doPost($options["content"]);
            } else if ($method == "PUT") {
                
                $client->setTimeout(600);
                
                $code = $client->doPut($options["content"]);
                if ($code == 504) {
                    $code = $client->doPut($options["content"]);
                }                
            }

            //
            $rsp = json_decode($client->getBody(), false);

        } catch (Exception $e) {

            $rsp->error = (object) array(
                "code"    => "". $e->getCode(),
                "message" => $e->getMessage(),
            );
        }
        
        if (!isset($rsp)) {
           
        }

        if (!isset($rsp->error) && !isset($rsp->kind)) {

            $rsp->error = (object) array(
                "code"    => self::ErrCodeClientError,
                "message" => "Network Connection Exception",
            );
        }

        return $rsp;
    }

    private static function sign($content = "")
    {
        return sprintf("TS301 %s:%s", self::$AccessKey, base64_encode(hash_hmac("sha1", $content, self::$SecretKey, true)));
    }
}


/**
 * Class Ts3_Client_HttpClient
 *
 * Example: GET
 *  $client = new Ts3_Client_HttpClient('http://www.example.com/get.php?var=value');
 *  if ($client->doGet() == 200) {
 *      $response = $client->getBody();
 *  }
 *
 * Example: POST/PUT
 *  $client = new Ts3_Client_HttpClient('http://www.example.com/post.php);
 *  $data = '<?xml version="1.0" encoding="utf-8"?>
 *      <feed xmlns="http://www.w3.org/2005/Atom">
 *          <entry>...</entry>
 *      </feed>';
 *  if ($client->doPost($data) == 200) {
 *      $response = $client->getBody();
 *  }
 * 
 * @category   Tml
 * @package    Tml_Net
 */
class Ts3_Client_HttpClient
{
    protected $_uri      = '';
    protected $_headers  = array('Expect:');
    protected $_body     = NULL;

    protected $_conn     = NULL;

    protected $_timeout  = 60;

    /**
     * Content attributes
     */
    const CONTENT_LENGTH = 'Content-Length';

    public function __construct($uri = NULL)
    {
        $this->_uri = $uri;
    }

    public function setUri($uri)
    {
        $this->_uri = $uri;
        $this->_conn($uri);
    }

    public function setHeader($k, $v)
    {
        $this->_headers[] = "$k:$v";
    }

    public function setTimeout($v)
    {
        $this->_timeout = $v;
        
        if ($this->_conn) {
            curl_setopt($this->_conn, CURLOPT_CONNECTTIMEOUT, $this->_timeout);
            curl_setopt($this->_conn, CURLOPT_TIMEOUT, $this->_timeout);
        }
    }

    protected function _conn($uri = NULL)
    {
        if ($this->_conn !== NULL && $uri === NULL) {
            return;
        }

        if ($uri !== NULL) {
            $this->_uri = $uri;
        }

        $this->_conn = curl_init();

        curl_setopt($this->_conn, CURLOPT_URL, $this->_uri);
        // curl_setopt($this->_conn, CURLOPT_HEADER, true);
        curl_setopt($this->_conn, CURL_HTTP_VERSION_1_1, true);
        curl_setopt($this->_conn, CURLOPT_CONNECTTIMEOUT, $this->_timeout);
        curl_setopt($this->_conn, CURLOPT_TIMEOUT, $this->_timeout);
        curl_setopt($this->_conn, CURLOPT_ENCODING, "gzip");
        curl_setopt($this->_conn, CURLOPT_USERAGENT, 'TmlNetHttp 4.x');
        curl_setopt($this->_conn, CURLOPT_RETURNTRANSFER, true);
    }

    final public function close()
    {
        if ($this->_conn !== NULL) {
            curl_close($this->_conn);
        }
    }

    final public function doGet($body = null)
    {
        $this->_conn();

        curl_setopt($this->_conn, CURLOPT_HTTPGET, true);

        return $this->_request($body);
    }

    final public function doPost($body)
    {
        $this->_conn();

        curl_setopt($this->_conn, CURLOPT_POST, true);
        curl_setopt($this->_conn, CURLOPT_POSTFIELDS, $body);

        return $this->_request($body);
    }

    final public function doPut($body)
    {
        $this->_conn();

        curl_setopt($this->_conn, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($this->_conn, CURLOPT_POSTFIELDS, $body);

        return $this->_request($body);
    }

    final public function doDelete($body)
    {
        $this->_conn();

        curl_setopt($this->_conn, CURLOPT_CUSTOMREQUEST, 'DELETE');

        return $this->_request($body);
    }

    protected function _request($body)
    {
        curl_setopt($this->_conn, CURLOPT_HTTPHEADER, $this->_headers);

        $this->_body = curl_exec($this->_conn);

        return curl_getinfo($this->_conn, CURLINFO_HTTP_CODE);
    }

    final public function getBody()
    {
        return $this->_body;
    }

    final public function getInfo()
    {
        return curl_getinfo($this->_conn);
    }
}


