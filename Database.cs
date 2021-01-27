
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using TestApp2.Common;

namespace TestApp2
{
    public class Database
    {
        SqlConnection _cnn;
        public Database()
        {
            string connetionString = @"Server=ADMIN-LT;Database=AddressTracker;Integrated Security=true";
            _cnn = new SqlConnection(connetionString);
        }

        public List<Person> GetPersonList() 
        {
            _cnn.Open();
            string strSQL = "SELECT * FROM PersonalInformation";

            DataTable table = new DataTable();
            SqlDataAdapter adapter = new SqlDataAdapter(strSQL, _cnn);
            adapter.Fill(table);
            List<Person> personList = new List<Person>();

            foreach (DataRow row in table.Rows) 
            {
                Person person = new Person();
                person.FirstName = row["FirstName"].ToString();
                person.LastName = row["LastName"].ToString();
                person.Address = row["Address"].ToString();
                person.State = row["State"].ToString();
                personList.Add(person);
            }       

            _cnn.Close();

            return personList;
        }
    }
}
