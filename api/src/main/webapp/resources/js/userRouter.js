/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * url : 中支持 currentPage时，修改currentPage ，调用$rootScope.go 才会有效
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
var commonUrlParam = 'projectId&projectName&moduleId&moduleName&menu_a&menu_b&dataType&pageName';
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('userBugList', {
        url : '/user/bug/list?currentPage&name&creator&executor&tracer&tester&' + commonUrlParam,
        views : {
            'main' : {
                templateUrl: 'resources/html/user/bugList.tpl.html?v=V8.2.0_0631'
            }, 'page@userBugList' : {
                templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
            },'subMenu' :{
                templateUrl : 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631'
            }
        }
    }).state('userEditBug', {
        url : '/user/bug/edit?id&type&' + commonUrlParam,
        views : {
            'subMenu' :{
                templateUrl : 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631'
            }, 'main' : {
                templateUrl : 'resources/html/user/bugEdit.tpl.html?v=V8.2.0_0631'
            },'comment@userEditBug' : {
                templateUrl : 'resources/html/subTpl/bugComment.tpl.html?v=V8.2.0_0631'
            },'zoomImg@userEditBug' : {
                templateUrl : 'resources/html/subTpl/zoomImg.tpl.html?v=V8.2.0_0631'
            },'bugLog@userEditBug' : {
                templateUrl : 'resources/html/subTpl/bugLog.tpl.html?v=V8.2.0_0631'
            },'page@userEditBug' : {
                templateUrl : 'resources/html/visitor/page.tpl.html?v=V8.2.0_0631'
            }
        }
    });

    // 搜索
    $stateProvider.state('userSearchList', {
        url : '/user/search/list?keyword&currentPage&' + commonUrlParam,
        views : {
            'main' : {
                templateUrl : function($stateParems){
                    return 'resources/html/user/searchList.tpl.html?v=V8.2.0_0631';
                }
            },
            'page@userSearchList' : {
                templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
            },'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            }
        }
    });

	// 文档
    $stateProvider.state('userArticleList', {
        url : '/user/article/list?currentPage&name&category&' + commonUrlParam,
        views : {
            'main' : {
                templateUrl : function($stateParems){
                    return 'resources/html/user/articleList.tpl.html?v=V8.2.0_0631';
                }
            },
            'page@userArticleList' : {
                templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
            },'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            }
        }
    }).state('userEditArticle', {
        url : '/user/article/edit?id&' + commonUrlParam,
        views : {
            'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            }, 'main' : {
                templateUrl : function($stateParems){
                    return 'resources/html/user/articleEdit.tpl.html?v=V8.2.0_0631';
                }
            }
        }
    }).state('userArticleDetail', {
        url : '/user/article/detail?id&' + commonUrlParam,
        views : {
            'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            }, 'main' : {
                templateUrl : function($stateParems){
                    return 'resources/html/user/articleDetail.tpl.html?v=V8.2.0_0631';
                }
            }
        }
    });

    // 数据库表
    $stateProvider.state('userDictionaryList', {
        url : '/user/dictionary/list?currentPage&name&category&' + commonUrlParam,
        views : {
            'main' : {
                templateUrl : function($stateParems){
                    return 'resources/html/user/dictionaryList.tpl.html?v=V8.2.0_0631';
                }
            },
            'page@userDictionaryList' : {
                templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
            },'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            }
        }
    }).state('userEditDictionary', {
        url : '/user/dictionary/edit?id&' + commonUrlParam,
        views : {
            'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            }, 'main' : {
                templateUrl : function($stateParems){
                    return 'resources/html/user/dictionaryEdit.tpl.html?v=V8.2.0_0631';
                }
            }
        }
    }).state('userDictionaryDetail', {
        url : '/user/dictionary/detail?id&' + commonUrlParam,
        views : {
            'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            }, 'main' : {
                templateUrl : function($stateParems){
                    return 'resources/html/user/dictionaryDetail.tpl.html?v=V8.2.0_0631';
                }
            }
        }
    });

    // 接口
    $stateProvider.state('userInterList', {
        url : '/user/interface/list?&interfaceName&url&currentPage&' + commonUrlParam,
        views : {
            'main' : {
                templateUrl : 'resources/html/user/interfaceList.tpl.html?v=V8.2.0_0631'
            },'detail' : {
                templateUrl : function($stateParems){
                    return 'resources/html/user/interfaceCopy.tpl.html?v=V8.2.0_0631';
                }
            }, 'page@userInterList' : {
                templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
            },'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            }
        }
    }).state('userInterfaceEdit', {
        url : '/user/interface/edit?id&' + commonUrlParam,
        views : {
            'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            }, 'main' : {
                templateUrl : function($stateParems){
                    return 'resources/html/user/interfaceEdit.tpl.html?v=V8.2.0_0631';
                }
            },'detail' : {
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/interEditDialog.tpl.html?v=V8.2.0_0631';
                }
            }, 'interBaseEdit@userInterfaceEdit' : {
                templateUrl : 'resources/html/subTpl/interBaseEdit.tpl.html?v=V8.2.0_0631'
            }, 'interResParamEdit@userInterfaceEdit' : {
                templateUrl : 'resources/html/subTpl/interResParamEdit.tpl.html?v=V8.2.0_0631'
            }, 'interParamEdit@userInterfaceEdit' : {
                templateUrl : 'resources/html/subTpl/interParamEdit.tpl.html?v=V8.2.0_0631'
            }, 'interHeaderEdit@userInterfaceEdit' : {
                templateUrl : 'resources/html/subTpl/interHeaderEdit.tpl.html?v=V8.2.0_0631'
            }, 'interExampleEdit@userInterfaceEdit' : {
                templateUrl : 'resources/html/subTpl/interExampleEdit.tpl.html?v=V8.2.0_0631'
            }
        }
    }).state('userInterfaceDetail', {
        url : '/user/interface/detail?id&' + commonUrlParam,
        views : {
            'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            }, 'main' : {
                templateUrl : function($stateParems){
                    return 'resources/html/user/interfaceDetail.tpl.html?v=V8.2.0_0631';
                }
            }
        }
    }).state('userInterfaceDebug', {
        url : '/user/interface/debug?id&' + commonUrlParam,
        views : {
            'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            }, 'main' : {
                templateUrl : function($stateParems){
                    return 'resources/html/user/interfaceDebug.tpl.html?v=V8.2.0_0631';
                }
            }, 'interParamEdit@userInterfaceDebug' : {
                templateUrl : 'resources/html/subTpl/interParamEdit.tpl.html?v=V8.2.0_0631'
            }, 'interHeaderEdit@userInterfaceDebug' : {
                templateUrl : 'resources/html/subTpl/interHeaderEdit.tpl.html?v=V8.2.0_0631'
            }
        }
    });


	$stateProvider.state('loginOrRegister', {
		url : '/login',
		views : {
			'main' : {
				templateUrl : 'resources/html/admin/login.tpl.html?v=V8.2.0_0631'
			}
		}
	}).state('register', {
		url : '/register',
		views : {
			'main' : {
				templateUrl : 'resources/html/admin/register.tpl.html?v=V8.2.0_0631'
			}
		}
	}).state('findPwd', {
		url : '/findPwd',
		views : {
			'main' : {
				templateUrl : 'resources/html/user/findPwd.tpl.html?v=V8.2.0_0631'
			}
		}
	}).state('menuList', {
		url : '/admin/menu/list?parentId&type&menuName&' + commonUrlParam,
		views : {
			'main' : {
				templateUrl : 'resources/html/admin/menuList.tpl.html?v=V8.2.0_0631'
			},
			'page@menuList' : {
				templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
			},
			'detail' : {
				templateUrl : function($stateParems){
					return 'resources/html/admin/menuDetail.tpl.html?v=V8.2.0_0631';
				}
			},'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuMenu.tpl.html?v=V8.2.0_0631';
                }
            }
		}
	}).state('projectList', {
		url : '/user/project/list?projectShowType&type&' + commonUrlParam,
		views : {
			'main' :{
				templateUrl : function($stateParems){
					return 'resources/html/user/projectList.tpl.html?v=V8.2.0_0631';
				}
			},'page@projectList' : {
				templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
			},'detail' : {
				templateUrl : function($stateParems){
					return 'resources/html/user/projectDetail.tpl.html?v=V8.2.0_0631';
				}
			},'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuProject.tpl.html?v=V8.2.0_0631';
                }
            }

		}
	}).state('project', {
        url : '/user/project?' + commonUrlParam,
        views : {
            'main' :{
                templateUrl : function($stateParems){
                    return 'resources/html/user/project.tpl.html?v=V8.2.0_0631';
                }
            },'detail' : {
                templateUrl : function($stateParems){
                    return 'resources/html/user/projectDetail.tpl.html?v=V8.2.0_0631';
                }
            },'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            }

        }
    }).state('moduleList', {
		url : '/user/module/list?name&' + commonUrlParam,
		views : {
			'main' : {
				templateUrl : 'resources/html/user/moduleList.tpl.html?v=V8.2.0_0631'
			},
			'page@moduleList' : {
				templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
			},
			'detail' : {
				templateUrl : function($stateParems){
					return 'resources/html/user/moduleDetail.tpl.html?v=V8.2.0_0631';
				}
			},'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            }
		}
	}).state('errorList', {
		url : '/user/error/list?' + commonUrlParam,
		views : {
			'main' : {
				templateUrl : 'resources/html/user/errorList.tpl.html?v=V8.2.0_0631'
			},'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            },
			'page@errorList' : {
				templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
			},
			'detail' : {
				templateUrl : function($stateParems){
					return 'resources/html/user/errorDetail.tpl.html?v=V8.2.0_0631';
				}
			}
		}
	}).state('projectUserList', {
        url : '/user/projectUser/list?name&' + commonUrlParam,
        views : {
            'main' : {
                templateUrl : 'resources/html/user/projectUserList.tpl.html?v=V8.2.0_0631'
            },'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            },
            'page@projectUserList' : {
                templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
            },
            'detail' : {
                templateUrl : function($stateParems){
                    return 'resources/html/user/projectUserDetail.tpl.html?v=V8.2.0_0631';
                }
            }
        }
    }).state('projectMetaList', {
        url : '/user/projectMeta/list?type&' + commonUrlParam,
        views : {
            'main' : {
                templateUrl : 'resources/html/user/projectMetaList.tpl.html?v=V8.2.0_0631'
            },'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            },
            'page@projectMetaList' : {
                templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
            },
            'detail' : {
                templateUrl : function($stateParems){
                    return 'resources/html/user/projectMetaEdit.tpl.html?v=V8.2.0_0631';
                }
            }
        }
    }).state('logList', {
        url : '/user/log/list?identy&' + commonUrlParam,
        views : {
            'main' : {
                templateUrl : 'resources/html/user/logList.tpl.html?v=V8.2.0_0631'
            },'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            },
            'page@logList' : {
                templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
            },
            'detail' : {
                templateUrl : function($stateParems){
                    return 'resources/html/user/logDetail.tpl.html?v=V8.2.0_0631';
                }
            }
        }
    }).state('sourceList', {
		url : '/user/source/list?' + commonUrlParam,
		views : {
			'main' : {
				templateUrl : 'resources/html/user/sourceList.tpl.html?v=V8.2.0_0631'
			},
			'page@sourceList' : {
				templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
			},'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            },'detail' : {
				templateUrl : function($stateParems){
					return 'resources/html/user/sourceDetail.tpl.html?v=V8.2.0_0631';
				}
			}
		}
	}).state('settingList', {
		url : '/admin/setting/list?key&' + commonUrlParam,
		views : {
			'main' : {
				templateUrl : 'resources/html/admin/settingList.tpl.html?v=V8.2.0_0631'
			},
			'page@settingList' : {
				templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
			}
		}
	}).state('settingDetail', {
		url : '/admin/setting/detail?type&id&' + commonUrlParam,
		views : {
			'main' :{
				templateUrl : function($stateParems){
					return 'resources/html/admin/settingDetail_'+$stateParems.type+'.tpl.html?v=V8.2.0_0631';
				}
			},'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuSetting.tpl.html?v=V8.2.0_0631';
                }
            }
		}
	}).state('hotSearchList', {
        url : '/admin/hotSearch/list?' + commonUrlParam,
        views : {
            'main' : {
                templateUrl : 'resources/html/admin/hotSearchList.tpl.html?v=V8.2.0_0631'
            },
            'page@hotSearchList' : {
                templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
            }
        }
    }).state('configProperties', {
		url : '/admin/config/properties?' + commonUrlParam,
		views : {
			'main' :{
				templateUrl : function($stateParems){
					return 'resources/html/admin/config.properties.html';
				}
			},'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuSetting.tpl.html?v=V8.2.0_0631';
                }
            }
		}
	}).state('introduce', {
        url : '/user/introduce?' + commonUrlParam,
        views : {
            'main' :{
                templateUrl : function($stateParems){
                    return 'resources/html/user/introduce.html';
                }
            },'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuSetting.tpl.html?v=V8.2.0_0631';
                }
            }
        }
    }).state('dictionaryImoprtFromSql', {
		url : '/user/article/dictionary/importFromSql?' + commonUrlParam,
		views : {
			'main' :{
				templateUrl : function($stateParems){
					return 'resources/html/user/dictionaryImportFromSql.tpl.html?v=V8.2.0_0631';
				}
			},'subMenu' :{
                templateUrl : 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631'
            }
		}
	}).state('userList', {
		url : '/admin/user/list?' + commonUrlParam,
		views : {
			'main' : {
				templateUrl : 'resources/html/admin/userList.tpl.html?v=V8.2.0_0631'
			},
			'page@userList' : {
				templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
			},
			'detail' : {
				templateUrl : function($stateParems){
					return 'resources/html/admin/userDetail.tpl.html?v=V8.2.0_0631';
				}
			}
		}
	}).state('commentList', {
		url : '/user/comment/list?type&targetId&' + commonUrlParam,
		views : {
			'main' : {
				templateUrl : 'resources/html/user/commentList.tpl.html?v=V8.2.0_0631'
			},
			'page@commentList' : {
				templateUrl : 'resources/html/admin/page.tpl.html?v=V8.2.0_0631'
			},
			'detail' : {
				templateUrl : function($stateParems){
					return 'resources/html/user/commentDetail.tpl.html?v=V8.2.0_0631';
				}
			},'subMenu' :{
                templateUrl : function($stateParems){
                    return 'resources/html/subTpl/subMenuModule.tpl.html?v=V8.2.0_0631';
                }
            }
		}
	}).state('profile', {
		url : '/profile?' + commonUrlParam,
		views : {
			'main' : {
				templateUrl : 'resources/html/admin/userDetail.tpl.html?v=V8.2.0_0631'
			}
		}
	})
});