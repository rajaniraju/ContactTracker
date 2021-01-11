using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestApp2.Common;

namespace TestApp2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase

    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IMemoryCache _memoryCache;
        private const string CACHE_KEY = "My_Key";

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IMemoryCache memoryCache)


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
                Summary = Summaries[rng.Next(Summaries.Length)]
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

        [HttpGet]
        [Route("GetPerson")]
        public object GetPerson()
        {
            var person = _memoryCache.Get(CACHE_KEY);
            return person;

            //}
        }

        [HttpPost]
        [Route("SetPerson")]
        public object SetPerson([FromBody] Person person)
        {
            if (person == null)
            {
                return null;
            }

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
                personFound.State = person.State;
                personFound.Zip = person.Zip;
                personFound.Phone = person.Phone;
                _memoryCache.Set(CACHE_KEY, list);
            } 

            return list;
        }
        [HttpPost]
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
            personFound.State = person.State;
            personFound.Zip = person.Zip;
            personFound.Phone = person.Phone;


            _memoryCache.Set(CACHE_KEY, list);

            return list;
        }
        [HttpPost]
        [Route("DeleteEntry")]
        public object DeleteEntry([FromBody] string[]arr)
        {
            List<Person> list = _memoryCache.Get<List<Person>>(CACHE_KEY);
            var count = list.RemoveAll(p => arr.ToList().Contains(p.Id));

            _memoryCache.Set(CACHE_KEY, list);
            return list;
        }

    }

}
