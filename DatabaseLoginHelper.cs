using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;

namespace ContactTracker
{
    public class DatabaseLoginHelper 
    {
        SqlConnection _cnn;
        public DatabaseLoginHelper()
        {
            string connetionString = @"Server=LAPTOP-GDAIDKD8\SQL2019;Database=AddressTracker;Integrated Security=true";
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
                login.UserName = row["userName"].ToString();
                login.Password = row["password"].ToString();
                login.Id = row["id"].ToString();
                loginList.Add(login);
            }

            _cnn.Close();

            return loginList;
        }

        public bool AuthenticateUser(Login login)
        {
            string strSQL = $"SELECT * FROM LoginInformation WHERE userName='{login.UserName}'";
            _cnn.Open();
            DataTable table = new DataTable();
            SqlDataAdapter adapter = new SqlDataAdapter(strSQL, _cnn);
            adapter.Fill(table);
            _cnn.Close();

            var row = table.Rows[0];
            Login loginPerson = new Login();
            loginPerson.UserName = row["userName"].ToString();
            loginPerson.Password = row["password"].ToString();                  
            
            if (loginPerson != null && loginPerson.Password.Trim() == login.Password)
            {
                return true;
            }

            return false;
        }

    }
}
