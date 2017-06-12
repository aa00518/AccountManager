@echo off

for %%a in (
"cordova-plugin-console"
"cordova-plugin-device"
"cordova-plugin-googleplus"
"cordova-plugin-inappbrowser"
"cordova-plugin-splashscreen"
"cordova-plugin-statusbar"
"cordova-plugin-whitelist"
"cordova-sqlite-storage"
"ionic-plugin-keyboard"
) do call cordova plugin rm %%a

for %%b in (
"cordova-plugin-console"
"cordova-plugin-device"
"cordova-plugin-googleplus"
"cordova-plugin-inappbrowser"
"cordova-plugin-splashscreen"
"cordova-plugin-statusbar"
"cordova-plugin-whitelist"
"cordova-sqlite-storage"
"ionic-plugin-keyboard"
) do call cordova plugin add %%b
