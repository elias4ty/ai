(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

new Vue({
    el: '#elias',
    delimiters: ['{', '}'],
    data: {
        fill: null,
        data: new FormData(),
        inputUrl: '/resource/images/default.jpg',
        ouputUrl: '/resource/images/default.jpg',
        btnText: '点击开始'
    },
    methods: {
        uploadFile: function uploadFile(e) {

            var inputFile = e.target;
            if (!/(.*)\.(jpg|png)$/g.test(inputFile.files[0].name)) {
                alert('请上传有效图片');
                return;
            }

            this.file = { 'filename': inputFile.files[0].name };
            this.data.append('picture', inputFile.files[0]);

            var vm = this;
            $.ajax({
                url: '/ai/savePic/',
                method: 'POST',
                data: vm.data,
                processData: false,
                contentType: false
            }).then(function (result) {
                result = JSON.parse(result);
                if (result && result.status == 200) {
                    vm.inputUrl = result.url;
                }
            });
        },
        identify: function identify() {

            if (!this.file) {
                alert('请上传文件！');
                return;
            }
            var that = this;
            that.btnText = '扫描中...';

            $.ajax({
                url: '/ai/',
                method: 'POST',
                data: that.file,
                success: function success(r) {
                    r = JSON.parse(r);
                    console.log(r);
                    if (r.status == 200 && r.message == 'OK') {
                        that.ouputUrl = r.url;
                        that.btnText = '扫描结束!';
                    }
                }
            });
        }
    }
});
},{}]},{},[1])