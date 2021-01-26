
using System.Data.SqlClient;

namespace TestApp2
{
    public class Database
    {
        SqlConnection _cnn;
        Database()
        {
            string connetionString = @"Server=WIN-50GP30FGO75;Database=Demodb;User ID=sa;Password=demol23";
            _cnn = new SqlConnection(connetionString);
        }
    }
}
