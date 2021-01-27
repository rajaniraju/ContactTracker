
using System.Data.SqlClient;

namespace TestApp2
{
    public class Database
    {
        SqlConnection _cnn;
        Database()
        {
            string connetionString = @"Server=SQL Server 15.0.2080.9 - ADMIN-LT\Rajani;Database=Address Tracker;Integrated Security=true";
            _cnn = new SqlConnection(connetionString);
        }

        public void Test() 
        {
            _cnn.Open();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = _cnn;
            cmd.CommandText = "";
            _cnn.Close();
        }
    }
}
