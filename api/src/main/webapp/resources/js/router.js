
/**
 * 前后台共有的路由
 */
app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('visitorArticleDetailOld', {
		url : '/:projectId/article/detail/:moduleId/:type/:id',
		views : {
			'main' :{
				templateUrl : function($stateParems){
					if($stateParems.type != 'DICTIONARY')
						return 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/articleDetail_ARTICLE.tpl.html?v=V8.2.0_0631';
					else
						return 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/articleDetail_'+$stateParems.type+'.tpl.html?v=V8.2.0_0631';
				}
			},'comment@visitorArticleDetailOld' : {
				templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/subTpl/comment.tpl.html?v=V8.2.0_0631'
			},'page@visitorArticleDetailOld' : {
				templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/admin/page.tpl.html?v=V8.2.0_0631'
			}
		}
	}).state('visitorArticleDetail', {
        url : '/article/detail?projectId&moduleId&type&id',
        views : {
            'main' :{
                templateUrl : function($stateParems){
                    if($stateParems.type != 'DICTIONARY')
                        return 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/articleDetail_ARTICLE.tpl.html?v=V8.2.0_0631';
                    else
                        return 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/articleDetail_'+$stateParems.type+'.tpl.html?v=V8.2.0_0631';
                }
            },'comment@visitorArticleDetail' : {
                templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/subTpl/comment.tpl.html?v=V8.2.0_0631'
            },'page@visitorArticleDetail' : {
                templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/admin/page.tpl.html?v=V8.2.0_0631'
            }
        }
    }).state('visitorArticleListOld', {
        url : '/:projectId/article/list/:&moduleId/:type/:category/:name/:status',
        views : {
            'main' :{
                templateUrl : function($stateParems){
                    if($stateParems.type != "DICTIONARY")
                        return 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/articleList_ARTICLE.tpl.html?v=V8.2.0_0631';
                    else
                        return 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/articleList_'+$stateParems.type+'.tpl.html?v=V8.2.0_0631';
                }
            },'page@visitorArticleList' : {
                templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/page.tpl.html?v=V8.2.0_0631'
            }
        }
    }).state('visitorArticleList', {
		url : '/article/list?projectId&moduleId&type&category&name&status',
		views : {
			'main' :{
				templateUrl : function($stateParems){
					if($stateParems.type != "DICTIONARY")
						return 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/articleList_ARTICLE.tpl.html?v=V8.2.0_0631';
					else
						return 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/articleList_'+$stateParems.type+'.tpl.html?v=V8.2.0_0631';
				}
			},'page@visitorArticleList' : {
				templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/page.tpl.html?v=V8.2.0_0631'
			}
		}
	}).state('visitorSourceDetail', {
		url : '/source/detail?projectId&id',
		views : {
			'main' :{
				templateUrl : function($stateParems){
					return 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/sourceDetail' +
						'.tpl.html?v=V8.2.0_0631';
				}
			}
		}
	})
});