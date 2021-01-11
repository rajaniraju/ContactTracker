using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestApp2.Common
{
    public class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public int Zip { get; set; }
        public int Phone  {get;set;}
        public int City { get; set; }
        public string Id { get; set; }
        public string FullName
        {
            get
            {
                return this.FirstName + " " + this.LastName;
            }
        }

        public string FullAddress
        {
            get
            {
                return this.Address + " " + this.State + " " +this.City+""+ this.Zip;
            }
        }

    }
}
