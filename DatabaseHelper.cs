
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using TestApp2.Common;

namespace TestApp2
{
    public class DatabaseHelper
    {
        SqlConnection _cnn;
        public DatabaseHelper()
        {
            string connetionString = @"Server=localhost\sql2019;Database=AddressTracker;Integrated Security=true";
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
                person.Address2 = row["Address2"].ToString();
                person.City = row["City"].ToString();
                person.Phone = row["Phone"].ToString();
                person.Zip = row["Zip"].ToString();
                person.State = row["State"].ToString();
                person.Id = row["GUID"].ToString();
                
                personList.Add(person);
            }       

            _cnn.Close();

            return personList;
        }
        public void AddPerson(Person person)
        {
            _cnn.Open();
            var newGuid = Guid.NewGuid();
            string insertSql = "INSERT INTO PersonalInformation(FirstName, LastName, Address, Address2, State, City, Zip, Phone, Guid)";
            insertSql += $" VALUES('{person.FirstName}', '{person.LastName}', '{person.Address}', '{person.Address2}', '{person.State}', '{person.City}', '{person.Zip}', '{person.Phone}', '{newGuid}');";

            SqlCommand cmd = new SqlCommand(insertSql, _cnn);
            cmd.ExecuteNonQuery();
            _cnn.Close();
        }
        public List<Person> DeletePerson(string id)
        {
           _cnn.Open();
            string deleteSqlRow = "DELETE FROM PersonalInformation WHERE Guid='" + id + "'";
            SqlCommand cmd = new SqlCommand(deleteSqlRow, _cnn);           
            cmd.ExecuteNonQuery();
           _cnn.Close();

            List<Person> list = GetPersonList();
            return list;
        }
    }
}
