
/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/notFound');
	$stateProvider.state('notFound', {
        url : '/notFound',
        views : {
            'main' : {
                templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/notFound.tpl.html?v=V8.2.0_0631'
            }
        }
    }).state('visitorSearchCtrl', {
		url : '/visitorSearch?keyword',
		views : {
			'main' :{
				templateUrl : function($stateParems){
					return 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/searchResult.tpl.html?v=V8.2.0_0631';
				}
			},
			'page@visitorSearchCtrl' : {
				templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/page.tpl.html?v=V8.2.0_0631'
			}
		}
	}).state('visitorError', {
		url : '/error/list?projectId',
		views : {
			'main' : {
				templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/errorList.tpl.html?v=V8.2.0_0631'
			},
			'page@visitorError' : {
				templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/page.tpl.html?v=V8.2.0_0631'
			}
		}
	}).state('visitorModuleCtrl', {
		url : '/module/list?projectId',
		views : {
			'main' : {
				templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/moduleList.tpl.html?v=V8.2.0_0631'
            },
            'page@visitorModuleCtrl' : {
                templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/page.tpl.html?v=V8.2.0_0631'
            }
		}
	}).state('visitorInterfaceCtrl', {
		url : '/interface/list?projectId&moduleId',
		views : {
			'main' : {
				templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/interfaceList.tpl.html?v=V8.2.0_0631'
			},
			'page@visitorInterfaceCtrl' : {
				templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/page.tpl.html?v=V8.2.0_0631'
			}
		}
	}).state('visitorInterfaceDetailCtrl', {
		url : '/interface/detail?projectId&id',
		views : {
			'main' : {
				templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/interfaceDetail.tpl.html?v=V8.2.0_0631'
			}
		}
	}).state('frontInterfaceDetailCtrlOld', {
        url : '/:projectId/front/interfaceDetail/:id',
        views : {
            'main' : {
                templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/interfaceDetail.tpl.html'
            }
        }
    }).state('visitorSourceList', {
		url : '/source/list?projectId&moduleId',
		views : {
			'main' : {
				templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/sourceList.tpl.html?v=V8.2.0_0631'
			},
			'page@visitorSourceList' : {
				templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/page.tpl.html?v=V8.2.0_0631'
			}
		}
	}).state('visitorProjectList', {
		url : '/project/list?projectShowType&type',
		views : {
			'main' : {
				templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/projectList.tpl.html?v=V8.2.0_0631'
			},
			'page@visitorProjectList' : {
				templateUrl : 'https://api-crap-cn.oss-cn-beijing.aliyuncs.com/api.crap.cn/html/visitor/page.tpl.html?v=V8.2.0_0631'
			}
		}
	})
	/*********************前端项目主页*******************/
});