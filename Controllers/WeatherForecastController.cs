using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using ContactTracker.Common;
using System.Data;

namespace ContactTracker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase

    {      

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IMemoryCache _memoryCache;
        private const string CACHE_KEY = "My_Key";

        public WeatherForecastController(
            ILogger<WeatherForecastController> logger, 
            IMemoryCache memoryCache)
        {
            _logger = logger;
            _memoryCache = memoryCache;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
               
            })
            .ToArray();
        }

        //[HttpGet]
        //[Route("GetUserEntry/{firstName}/{lastName}/{age}")]
        //public object GetUserEntry(string firstName,string lastName,int age)
        //{           
        //    var  person = new Person();
        //    person.FirstName = firstName;
        //    person.LastName = lastName;
        //    person.Age = age;
        //    return person;
        //}
        //[HttpGet]
        //[Route("GetPerson")]
        //public object GetPerson(Database database)
        //{
        //    var database = new Database() 
        //    return database;

            
        //}

        [HttpGet]
        [Route("GetPersonList")]
        public List<Person> GetPersonList()
        {
            DatabaseHelper db = new DatabaseHelper();
            var personList = db.GetPersonList();
            return personList;            
        }

        [HttpPost]
        [Route("SavePerson")]
        public object SavePerson([FromBody] Person person)
        {
            if (person == null)
            {
                return null;
            }

            DatabaseHelper db = new DatabaseHelper();
            db.SavePerson(person);
            return null;

            /*
            List<Person> list = _memoryCache.Get<List<Person>>(CACHE_KEY);

            if (list == null) {
                list = new List<Person>();
            }

            var personFound = list.FirstOrDefault(p => p.FullName == person.FullName);
            if (personFound == null)
            {
                person.Id = Guid.NewGuid().ToString();
                list.Add(person);
                _memoryCache.Set(CACHE_KEY, list);
            }
            else 
            {
                personFound.Address = person.Address;
                personFound.Address2 = person.Address2;
                personFound.State = person.State;
                personFound.City = person.City;
                personFound.Zip = person.Zip;
                personFound.Phone = person.Phone;
                _memoryCache.Set(CACHE_KEY, list);
            } 

            return list;
            */
        }
        /*[HttpPost]
        [Route("SavePerson")]
        public object SavePerson([FromBody] Person person)
        {
            if (person == null)
            {
                return null;
            }

            List<Person> list = _memoryCache.Get<List<Person>>(CACHE_KEY);

            if (list == null)
            {
                return null;
            }
            
            var personFound = list.FirstOrDefault(p => p.Id == person.Id);
            if (personFound == null) {
                return null;
            }

            personFound.FirstName = person.FirstName;
            personFound.LastName = person.LastName;
            personFound.Address = person.Address;
            personFound.Address2 = person.Address2;
            personFound.City = person.City;
            personFound.State = person.State;
            personFound.Zip = person.Zip;
            personFound.City = person.City;
            personFound.Phone = person.Phone;


            _memoryCache.Set(CACHE_KEY, list);

            return list;
        }*/
        [HttpPost]
        [Route("DeleteEntry")]
        public object DeleteEntry([FromBody] string id)
        {
            
           // List<Person> list = _memoryCache.Get<List<Person>>(CACHE_KEY);
            //var count = list.RemoveAll(p => arr.ToList().Contains(p.Id));

           // _memoryCache.Set(CACHE_KEY, list);
            
            
            DatabaseHelper db = new DatabaseHelper();
            var personList = db.DeletePerson(id);
            return personList;
            
        }
        [HttpPost]
        [Route("CallChecked")]
        public void CalledChecked([FromBody]MarkCalledRequest called )
        {

            // List<Person> list = _memoryCache.Get<List<Person>>(CACHE_KEY);
            //var count = list.RemoveAll(p => arr.ToList().Contains(p.Id));

            // _memoryCache.Set(CACHE_KEY, list);


            DatabaseHelper db = new DatabaseHelper();

            db.CallChecked(called);
            return;
        }
        [HttpPost]
        [Route("MailChecked")]
        public void MailChecked([FromBody] MarkMailRequest mailed)
        {

            // List<Person> list = _memoryCache.Get<List<Person>>(CACHE_KEY);
            //var count = list.RemoveAll(p => arr.ToList().Contains(p.Id));

            // _memoryCache.Set(CACHE_KEY, list);


            DatabaseHelper db = new DatabaseHelper();

            db.MailChecked(mailed);
            return;
        }
        [HttpPost]
        [Route("DeleteSelectedEntry")]
        public object DeleteSelectedEntry([FromBody] string[]idsToDelete)
        {

            // List<Person> list = _memoryCache.Get<List<Person>>(CACHE_KEY);
            //var count = list.RemoveAll(p => arr.ToList().Contains(p.Id));

            // _memoryCache.Set(CACHE_KEY, list);


            DatabaseHelper db = new DatabaseHelper();
           
             var personList = db.DeleteSelectedPerson(idsToDelete);
            return personList;

        }

    }

}
