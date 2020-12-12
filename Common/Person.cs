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
        public int Age { get; set; }
        public string FullName 
        { 
            get 
            {
                return this.FirstName + " " + this.LastName;
            } 
        }
    }
}
