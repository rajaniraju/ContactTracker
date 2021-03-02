using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;

namespace ContactTracker
{
    public class DatabaseLoginHelper 
    {
        SqlConnection _cnn;
        public DatabaseLoginHelper()
        {
            string connetionString = @"Server=localhost;Database=AddressTracker;Integrated Security=true";
            _cnn = new SqlConnection(connetionString);
        }
        public List<Login> GetLoginList()
        {

            
            string strSQL = "SELECT * FROM LoginInformation";
            _cnn.Open();

            DataTable table = new DataTable();
            SqlDataAdapter adapter = new SqlDataAdapter(strSQL, _cnn);
            adapter.Fill(table);
            List<Login> loginList = new List<Login>();
            
            foreach (DataRow row in table.Rows)
            {
                Login login = new Login();
                login.userName = row["userName"].ToString();
                login.password = row["password"].ToString();
                login.id = row["id"].ToString();
                loginList.Add(login);
            }

            _cnn.Close();

            return loginList;
        }

        public bool AuthenticateUser(Login login)
        {
            //string sql;
            //_cnn.Open();
            //if (string.IsNullOrEmpty(login.id))
            //{
            //    var newGuid = Guid.NewGuid();
            //    sql = "INSERT INTO LoginInformation(userName,password)";
            //    sql += $" VALUES('{login.userName}', '{login.password}', );";
            //}
            //else
            //{
            //    sql = "UPDATE LoginInformation";
            //    sql += $" SET userName= '{ login.userName }', password = '{login.password}''";
            //    sql += $" WHERE GUID='{login.id}'";
            //}
            //SqlCommand cmd = new SqlCommand(sql, _cnn);
            //List<Login> list = GetLoginList();
            //cmd.ExecuteNonQuery();
            // _cnn.Close();
            //return list;
            return false;            
        }

    }
}
