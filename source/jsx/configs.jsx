define([], function() {

    /*
        You need to replace these API keys and hostnames with
        your own. Then run 'grunt dev' on the console to transpile
        this file into .js
    */

    var local = {
        env: 'local',
        Skylink: {
            apiMCUKey: '8ed5ad9b-80b3-48c7-a1e1-02c734f26ce1',
            apiNoMCUKey: '8ed5ad9b-80b3-48c7-a1e1-02c734f26ce1'
        },
        maxUsers: 5
    };

    var dev = {
        env: 'dev',
        Skylink: {
            apiMCUKey: '8ed5ad9b-80b3-48c7-a1e1-02c734f26ce1',
            apiNoMCUKey: '8ed5ad9b-80b3-48c7-a1e1-02c734f26ce1'
        },
        maxUsers: 5
    };

    var prod = {
        env: 'prod',
        Skylink: {
            apiMCUKey: '8ed5ad9b-80b3-48c7-a1e1-02c734f26ce1',
            apiNoMCUKey: '8ed5ad9b-80b3-48c7-a1e1-02c734f26ce1'
        },
        maxUsers: 5
    };

    return location.host === '130.211.185.224' ? prod : (
            location.host === '130.211.185.224' ? dev : local
        );

});
