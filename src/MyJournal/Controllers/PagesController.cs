using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyJournal.Models;
using MyJournal.Services;

namespace MyJournal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PagesController : ControllerBase
    {
        private readonly PageService _pageService;
        public PagesController(PageService pageService)
        {
            _pageService = pageService;
        }

        [HttpGet]
        public ActionResult<List<Page>> Get() => _pageService.Get();

        [HttpGet("{id:length(24)}")]
        public ActionResult<Page> Get(string id)
        {
            var page = _pageService.Get(id);

            if(page == null)
            {
                return NotFound();
            }

            return page;
        }

        [HttpPost]
        public ActionResult<Page> AddPage(Page page)
        {
            var newPage = _pageService.CreatePage(page);

            return CreatedAtRoute("Get", new { id = newPage.Id }, page);
        }

        [HttpPost("{id:length(24)}")]
        public ActionResult<Page> AddEntry(string id, Entry newEntry)
        {
            return _pageService.CreateEntry(id, newEntry);
        }
    }
}