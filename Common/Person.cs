namespace ContactTracker.Common
{
    public class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Phone  {get;set;}
        public string City { get; set; }
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
                return (this.Address + " "+ this.Address2 +" "+ this.State + " " +this.City+""+ this.Zip);
            }
        }

    }
}
