export default (that) => {
    // 获取视频插件
    return {
        videoInfo() {
            const resetAjax = that.resetAjax || function () {}
            return new Promise((resolve, reject) => {
                resetAjax({
                    method: 'get',
                    url: `evo-brm/1.2.0/resources-info/get-resource?category=1&type=DHPlayer`,
                    isNoLock: true,
                    isSNoTip: true,
                    jumpLogin: true,
                    onSuccess(rel) {
                        resolve(rel.data.data)
                    },
                    onError(rel) {
                        reject(rel)
                    }
                })
            })
        },
        /**
         * @method fetchRealRTSP 获取实时视频RTSP地址
         */
        fetchRealRTSP(params) {
            const resetAjax = that.resetAjax || function () {}
            return new Promise((resolve, reject) => {
                resetAjax({
                    method: 'post',
                    url: `admin/API/MTS/Video/StartVideo`,
                    isSNoTip: true,
                    jumpLogin: true,
                    data: params,
                    onSuccess(res) {
                        resolve(res.data.data)
                    },
                    onError(res) {
                        reject(res)
                    }
                })
            })
        },
        /**
         * @method 获取联动录像 RTSP地址
         */
        fetchRTSP(params) {
            const resetAjax = that.resetAjax || function () {}
            return new Promise((resolve, reject) => {
                resetAjax({
                    method: 'post',
                    url: `admin/API/SS/Playback/StartPlaybackByTime`,
                    isSNoTip: true,
                    data: params,
                    onSuccess(res) {
                        resolve(res.data.data)
                    },
                    onError(res) {
                        reject(res)
                    }
                })
            })
        },
        //获取录像文件
        fetchRecord(params) {
            const resetAjax = that.resetAjax || function () {}
            return new Promise((resolve, reject) => {
                resetAjax({
                    method: 'post',
                    url: `admin/API/SS/Record/QueryRecords`,
                    isSNoTip: true,
                    data: params,
                    onSuccess(res) {
                        resolve(res.data.data)
                    },
                    onError(res) {
                        reject(res)
                    }
                })
            })
        }
    }
}