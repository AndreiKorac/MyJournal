using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MyJournal.Interfaces;
using MyJournal.Models;

namespace MyJournal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PagesController : ControllerBase
    {
        private readonly IPageService _pageService;
        public PagesController(IPageService pageService)
        {
            _pageService = pageService;
        }

        // GET api/pages
        // Returns all pages
        [HttpGet]
        public ActionResult<List<Page>> Get()
        {
            return _pageService.Get();
        }

        // GET api/pages/{id}
        // Returns page for specified id
        [HttpGet("{id:length(24)}", Name = "GetPage")]
        public ActionResult<Page> Get(string id)
        {
            var page = _pageService.Get(id);

            if(page == null)
            {
                return NotFound();
            }

            return page;
        }

        // POST api/pages
        // Creates page and returns the created page
        // Values passed as request body
        [HttpPost]
        public ActionResult<Page> PostPages(Page page)
        {
            var newPage = _pageService.CreatePage(page);

            return CreatedAtRoute("GetPage", new { id = newPage.Id }, page);
        }

        // DELETE api/pages/{id}
        [HttpDelete("{id:length(24)}")]
        public ActionResult<Page> DeletePage(string id)
        {
            var page = _pageService.Get(id);
            if (page != null)
            {
                _pageService.Delete(page.Id);
                return NoContent();
            }
            else return NotFound();
        }
    }
}