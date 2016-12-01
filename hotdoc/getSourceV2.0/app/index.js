/*
* @Author: 张驰阳
* @Date:   2016-11-28 17:20:37
* @Last Modified by:   张驰阳
* @Last Modified time: 2016-11-28 17:22:25
*/

'use strict';

var wdog = {
    config: {
        authDomain: "infi000.wilddog.com",
        syncURL: "https://infi000.wilddogio.com"
    }
};

wilddog.initializeApp(wdog.config);
wdog.ref = wilddog.sync().ref("/jrstv/");
wdog.ref_2 = wilddog.sync().ref("/zhibodude/");