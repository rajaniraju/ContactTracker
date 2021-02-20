using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using ContactTracker.Common;

namespace ContactTracker
{
    public class DatabaseHelper
    {
        SqlConnection _cnn;
        public DatabaseHelper()
        {
            string connetionString = @"Server=localhost;Database=AddressTracker;Integrated Security=true";
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
        public void SavePerson(Person person)
        {
            string sql;
            _cnn.Open();
            if (string.IsNullOrEmpty(person.Id))
            {
                var newGuid = Guid.NewGuid();
                sql = "INSERT INTO PersonalInformation(FirstName, LastName, Address, Address2, State, City, Zip, Phone, Guid)";
                sql += $" VALUES('{person.FirstName}', '{person.LastName}', '{person.Address}', '{person.Address2}', '{person.State}', '{person.City}', '{person.Zip}', '{person.Phone}', '{newGuid}');";
            }
            else
            {
                sql = "UPDATE PersonalInformation";
                sql += $" SET FirstName= '{ person.FirstName }', LastName = '{person.LastName}', Address='{person.Address}', Address2='{person.Address2}', State='{person.State}', City='{person.City}', Zip='{person.Zip}', Phone='{person.Phone}'";
                sql += $" WHERE GUID='{person.Id}'";
            }
            SqlCommand cmd = new SqlCommand(sql, _cnn);
            cmd.ExecuteNonQuery();
            _cnn.Close();
        }
        public void Calledchecked(MarkCalledRequest callchecked)
        {
            string insertCalled;
            if (callchecked.IsCalled)
            { 
                insertCalled = "UPDATE PersonalInformation  set is_Called = 1 WHERE Guid='" + callchecked.Id + "'"; 
            }
            else
            { 
                insertCalled = "UPDATE PersonalInformation  set is_Called = 0 WHERE Guid='" + callchecked.Id + "'"; 
            }
            _cnn.Open();

            SqlCommand cmd = new SqlCommand(insertCalled, _cnn);
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
        public List<Person> DeleteSelectedPerson(string[] idsToDelete)
        {
            if (idsToDelete == null || idsToDelete.Length <= 0) throw new Exception("Empty list");

            string idCsvWithQuotes = string.Format("'{0}'", string.Join("','", idsToDelete));
            string deleteSqlRow = "DELETE FROM PersonalInformation WHERE Guid in (" + idCsvWithQuotes + ")";
            _cnn.Open();
            SqlCommand cmd = new SqlCommand(deleteSqlRow, _cnn);
            cmd.ExecuteNonQuery();
            _cnn.Close();

            List<Person> list = GetPersonList();
            return list;
        }
    }
}
