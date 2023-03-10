package cn.crap.framework.base;

import cn.crap.dto.LoginInfoDto;
import cn.crap.enu.*;
import cn.crap.framework.JsonResult;
import cn.crap.framework.MyException;
import cn.crap.framework.ThreadContext;
import cn.crap.model.ModulePO;
import cn.crap.model.ProjectPO;
import cn.crap.model.ProjectUserPO;
import cn.crap.query.BaseQuery;
import cn.crap.query.ProjectUserQuery;
import cn.crap.service.tool.*;
import cn.crap.utils.*;
import org.apache.log4j.Logger;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.List;

public abstract class BaseController implements IConst, ISetting {
    protected final static String ERROR_VIEW = "/WEB-INF/views/result.jsp";
    protected final static int SIZE = 15;
    protected Logger log = Logger.getLogger(getClass());
    protected final static JsonResult SUCCESS = new JsonResult();
    @Resource(name = "projectCache")
    protected ProjectCache projectCache;
    @Resource(name = "moduleCache")
    protected ModuleCache moduleCache;
    @Resource(name = "stringCache")
    protected StringCache stringCache;
    @Resource(name = "settingCache")
    protected SettingCache settingCache;
    @Resource(name = "userCache")
    protected UserCache userCache;
    @Resource(name = "objectCache")
    protected ObjectCache objectCache;

    protected String getIp() {
        HttpServletRequest request = ThreadContext.request();
        String remoteHost = (request == null ? "" : request.getRemoteHost());
        return remoteHost;
    }

    protected boolean blackInterface(String id) throws MyException{
        String ipList = settingCache.get(ISetting.S_INTERFACE_BLACK_LIST).getValue();
        return (ipList.contains(id) || ipList.equals("all"));
    }

    protected ProjectPO getProject(BaseQuery query){
        Assert.isTrue(MyString.isNotEmptyOrNUll(query.getProjectId())
                || MyString.isNotEmptyOrNUll(query.getModuleId()), "projectId???moduleId??????????????????");

        if (MyString.isNotEmptyOrNUll(query.getModuleId())){
            ModulePO module = moduleCache.get(query.getModuleId());
            return projectCache.get(module.getProjectId());
        }

        if (query.getProjectId()!= null){
            return projectCache.get(query.getProjectId());
        }
        return null;
    }

    protected String getProjectId(String projectId, String moduleId){
        Assert.isTrue(MyString.isNotEmptyOrNUll(projectId)
                || MyString.isNotEmptyOrNUll(moduleId), "projectId???moduleId??????????????????");

        if (MyString.isNotEmptyOrNUll(moduleId)){
            String moduleProjectId = moduleCache.get(moduleId).getProjectId();
            return moduleProjectId == null ? projectId : moduleProjectId;
        }
        return projectId;
    }

    protected ProjectPO getProject(String projectId, String moduleId){
        Assert.isTrue(MyString.isNotEmptyOrNUll(projectId)
                || MyString.isNotEmptyOrNUll(moduleId), "projectId???moduleId??????????????????");

        if (MyString.isNotEmptyOrNUll(moduleId)){
            projectId = moduleCache.get(moduleId).getProjectId();
        }
        return projectCache.get(projectId);
    }

    protected ModulePO getModule(BaseQuery query){
        if (query.getModuleId() != null){
            ModulePO module = moduleCache.get(query.getModuleId());
            return module.getId() == null ? null : module;
        }
        return null;
    }

    /**
     * @param param ???????????????
     * @param tip ??????????????????
     * @param myError
     * @throws MyException
     */
    protected void throwExceptionWhenIsNull(String param, String tip, MyError myError) throws MyException{
        if (myError == null){
            myError = MyError.E000020;
        }
        if (MyString.isEmpty(param)) {
            throw new MyException(myError, tip);
        }
    }

    protected void throwExceptionWhenIsNull(String param, String tip) throws MyException{
        throwExceptionWhenIsNull(param, tip, null);
    }


    @ExceptionHandler({Exception.class})
    @ResponseBody
    public JsonResult expHandler(HttpServletRequest request, Exception ex) {
        if (ex instanceof MyException) {
            return new JsonResult((MyException) ex);
        }

        String userId = null;
        LoginInfoDto loginInfoDto = LoginUserHelper.tryGetUser();
        if (loginInfoDto != null){
            userId = loginInfoDto.getId();
        }

        if (ex instanceof NullPointerException) {
            log.error("???????????????," + request.getRequestURI() + ",userId:" + userId + ",params:" + getAllStrParam(request), ex);
            return new JsonResult(new MyException(MyError.E000051));
        }
        else if (ex instanceof IOException) {
            log.error("IOException," + request.getRequestURI() + ",userId:" + userId + ",params:" + getAllStrParam(request) + "," + ex.getMessage());
            return new JsonResult(new MyException(MyError.E000051));
        }
        else {
            log.error("??????," + request.getRequestURI() + ",userId:" + userId + ",params:" + getAllStrParam(request), ex);
            ByteArrayOutputStream outPutStream = new ByteArrayOutputStream();
            ex.printStackTrace(new PrintStream(outPutStream));
            String errorStackTrace = outPutStream.toString();
            try {
                outPutStream.close();
            } catch (IOException e) {
            }

            String exceptionDetail[] = errorStackTrace.split("Caused by:");
            String errorReason = "";
            if (exceptionDetail.length > 0) {
                errorReason = exceptionDetail[exceptionDetail.length - 1].split("\n")[0];
            }

            /**
             * field is too long
             * ????????????????????????????????????
             */
            if (ex instanceof DataIntegrityViolationException) {
                if (errorReason.contains("com.mysql.jdbc.MysqlDataTruncation") || errorReason.contains("com.mysql.cj.jdbc.exceptions.MysqlDataTruncation")) {
                    int index = errorStackTrace.indexOf("insert into") + 11;
                    String table = errorStackTrace.substring(index, index + 100).split(" ")[1].trim();
                    return new JsonResult(new MyException(MyError.E000052, "????????????" + table + "." + errorReason.split("'")[1] + "???"));
                }
            }
            return new JsonResult(new MyException(MyError.E000001, ex.getMessage() + "??????????????????" + errorReason));
        }
    }

    /**
     * ??????????????????
     *
     * @param message
     */
    protected void printMsg(String message) {
        printMsg(null, message, InterfaceContentType.HTML);
    }

    protected void printMsg(HttpServletResponse response, String message, InterfaceContentType contentType) {
        if (contentType == null){
            contentType = InterfaceContentType.JSON;
        }
        if (MyString.isEmpty(message)){
            message = " ";
        }
        if (response == null){
            response = ThreadContext.response();
        }
        response.setHeader("Content-Type", contentType.getType());
        response.setCharacterEncoding("utf-8");
        try {
            PrintWriter out = response.getWriter();
            out.write(message);
            out.flush();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * ????????????
     * @param project
     * @throws MyException
     */
    protected void checkPermission(ProjectPO project) throws MyException {
        PermissionUtil.checkPermission(project, ProjectPermissionEnum.MY_DATE);
    }

    protected void checkPermission(ProjectPO project, ProjectPermissionEnum type) throws MyException {
        PermissionUtil.checkPermission(project, type);
    }

    protected void checkPermission(String projectId, ProjectPermissionEnum type) throws MyException {
        PermissionUtil.checkPermission(projectCache.get(projectId), type);
    }

    protected void checkPermission(String projectId) throws MyException {
        PermissionUtil.checkPermission(projectCache.get(projectId), ProjectPermissionEnum.MY_DATE);
    }

    /**
     * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     *
     * @param projectPassword ???????????????????????????????????????
     * @param inputPassword
     * @param visitCode
     * @throws MyException
     */
    public void verifyPassword(String projectId, String projectPassword, String inputPassword, String visitCode) throws MyException {
        String COOKIE_PROJECT_PASSWORD = "cpp" + projectPassword;
        if (MyString.isEmpty(projectPassword)) {
            return;
        }

        String tempPassword = MyCookie.getCookie(COOKIE_PROJECT_PASSWORD, true);
        /**
         * ????????????????????????????????????
         * ??????????????????????????????
         */
        if (projectPassword.length() < 20 && MyString.equals(tempPassword, projectPassword)) {
            return;
        }

        /**
         * ???????????????????????????md5+??????????????????
         */
        if (MyString.equals(MD5.encrytMD5(tempPassword, projectId), projectPassword)) {
            return;
        }

        /**
         * ????????????????????????????????????
         */
        if (projectPassword.length() < 20 && MyString.notEquals(inputPassword, projectPassword)) {
            throw new MyException(MyError.E000007);
        }

        if (projectPassword.length() >= 20 && MyString.notEquals(MD5.encrytMD5(inputPassword, projectId), projectPassword)) {
            throw new MyException(MyError.E000007);
        }

        /**
         * ??????????????????????????????????????????????????????????????????????????????????????????
         */
        if (settingCache.get(S_VISITCODE).getValue().equals("true")) {
            String imgCode = "";
            try{
                imgCode = Tools.getImgCode();
            }catch (MyException e){
                throw new MyException(MyError.E000007);
            }
            if (MyString.notEquals(imgCode, visitCode)) {
                throw new MyException(MyError.E000007);
            }
        }

        /**
         * ??????????????????????????????????????????
         * ???????????????12??????
         */
        MyCookie.addCookie(COOKIE_PROJECT_PASSWORD, inputPassword, true, 60 * 60 * 12);
    }

    /**
     * ????????????????????????
     * private project need login
     * public project need check password,
     *
     * @param inputPassword
     * @param visitCode
     * @param project
     * @throws MyException
     */
    protected void checkFrontPermission(String inputPassword, String visitCode, ProjectPO project) throws MyException {
        // ?????????????????????????????????????????????????????????????????????????????????????????????
        if (project.getType() == ProjectType.PRIVATE.getType()) {
            LoginInfoDto user = LoginUserHelper.getUser(MyError.E000041);

            // ???????????????????????????
            if (user != null && ("," + user.getAuthStr()).indexOf("," + AdminPermissionEnum.SUPER.name() + ",") >= 0) {
                return;
            }

            // ???????????????
            if (user.getId().equals(project.getUserId())) {
                return;
            }

            // ????????????
            List<ProjectUserPO> projectUserPOList = ServiceFactory.getInstance().getProjectUserService().select(
                    new ProjectUserQuery().setProjectId(project.getId()).setUserId(user.getId()));
            if (CollectionUtils.isEmpty(projectUserPOList)) {
                throw new MyException(MyError.E000042);
            }

        } else {
            String projectPassword = project.getPassword();
            verifyPassword(project.getId(), projectPassword, inputPassword, visitCode);
        }
    }

    protected Object getParam(String key, String def) {
        String value = ThreadContext.request().getParameter(key);
        return value == null ? def : value;
    }

    private String getAllStrParam(HttpServletRequest request){
        try {
            StringBuilder sb = new StringBuilder("[");
            Enumeration paramNames = request.getParameterNames();
            while (paramNames.hasMoreElements()) {
                String paramName = (String) paramNames.nextElement();
                sb.append(paramName + "=");
                boolean isFirst = true;
                for (String paramValue : request.getParameterValues(paramName)) {
                    sb.append((isFirst ? "" : ",") + paramValue);
                    isFirst = false;
                }
                sb.append(";");
            }
            sb.append("]");
            return sb.toString();
        }catch (Exception e){
            log.error("????????????????????????", e);
            return "";
        }
    }
}