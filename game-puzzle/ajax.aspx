<%@ Page language="c#" AutoEventWireup="true" EnableSessionState="true" enableViewState="true"%><!--#include virtual='/_pdm_inc/function.aspx' --><%
    System.Data.DataTable dt = new System.Data.DataTable();
    string connCStr = ConfigurationSettings.AppSettings["PublishDBConnectionStringNew"];
    string re = "";

    string time = (string)HttpContext.Current.Request["time"];
    string name = (string)HttpContext.Current.Request["name"];
    string code = (string)HttpContext.Current.Request["code"];
    string type = (string)HttpContext.Current.Request["type"];

    if (!string.IsNullOrEmpty(time))
    {
        string[] strSplits = time.Split(':');
        if (strSplits.Length != 3)
            return;

        try
        {
            TimeSpan span = new TimeSpan(int.Parse(strSplits[0]), int.Parse(strSplits[1]), int.Parse(strSplits[2]));
            time = ((int)(span.Ticks / (1000 * 10000))).ToString();
        }
        catch
        {
            return;
        }
    }
                                                                                                                                                      
    if (type == "1")
    {
        if (!string.IsNullOrEmpty(time))
        {
            re = "目前排名第<span style='color: Green;'>" + SqlUtility.DataTableFromSQL("select count(Id)+1 from moad_common where spath='picgame' and age<=" + time, connCStr).Rows[0][0] + "</span>名";
        }
    }
    else if (type == "2")
    {
        re = "<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td height='26' colspan='2' valign='bottom' style='font-weight: bold; color: #cc0000;'>Top 6</td></tr>";
        dt = SqlUtility.DataTableFromSQL("select top 6 * from moad_common where spath='picgame' order by age", connCStr);

        if (dt != null && dt.Rows.Count > 0)
        {
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                re += "<tr><td height='26' width='40%' align='right'>";
                string userName = dt.Rows[i]["userName"].ToString().Trim();
                int userTime = int.Parse(dt.Rows[i]["age"].ToString().Trim());
                int h = userTime / 3600;
                int m = (userTime - 3600 * h) / 60;
                int s = (userTime - 3600 * h) % 60;

                string len = h.ToString().PadLeft(2, '0') + ":" + m.ToString().PadLeft(2, '0') + ":" + s.ToString().PadLeft(2, '0');

                re += userName + "：</td><td width='60%' align='center'>" + len + "</td></tr>";
            }
            for (int s = 0; s < 6 - dt.Rows.Count; s++)
            {
                re += "<tr><td height='26' width='40%' align='right'>--：</td><td width='60%' align='center'>--</td></tr>";
            }
        }
        else
        {
            re += "<tr><td height='26' colspan='2'>暂无玩家参与排名</td></tr>";
        }
        re += "<tr><td height='10' colspan='2'></td></tr></table>";
    }
    else if (type == "3")
    {
        if (string.IsNullOrEmpty(name))
            name = "无名大虾";
        if (!string.IsNullOrEmpty(time))
        {
            string uaFullStr = "";
            try
            {
                uaFullStr = System.Web.HttpContext.Current.Request.UserAgent;
                if (!string.IsNullOrEmpty(uaFullStr) && uaFullStr.Length > 200)
                    uaFullStr = uaFullStr.Substring(200);
            }
            catch { }
            SqlUtility.updateData("insert into moad_common(userNumber,spath,userName,age,UA) values('暂无手机号','picgame','" + name + "','" + time + "','" + uaFullStr + "')", connCStr);
            //re = "insert into moad_common(userNumber,spath,userName,age) values('暂无手机号','picgame','" + name + "','" + time + "')";
        }
    }
    Response.Write(re);
%>