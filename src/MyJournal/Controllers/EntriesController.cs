﻿using System;
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
    public class EntriesController : ControllerBase
    {
        private readonly PageService _pageService;

        public EntriesController(PageService pageService)
        {
            _pageService = pageService;
        }

        // POST api/entries/{id}
        // Creates entry for the page with the given id
        [HttpPost("{id:length(24)}")]
        public ActionResult<Page> AddEntry(string id, Entry newEntry)
        {
            return _pageService.CreateEntry(id, newEntry);
        }

        // PUT api/entries/{id}
        // Updates a page with the given Entry information
        [HttpPut("{id:length(24)}")]
        public ActionResult<Page> UpdateEntry(string id, [FromBody]Entry entryToUpdate)
        {
            return _pageService.UpdateEntry(id, entryToUpdate);
        }

        // DELETE api/entries/{id}
        // Deletes an entry from a page
        [HttpDelete("{id:length(24)}")]
        public ActionResult<Page> DeleteEntry(string id, [FromBody]Entry entryToDelete)
        {
            var page = _pageService.Get(id);
            if (page != null)
            {
                Page newPage = _pageService.DeleteEntry(page.Id, entryToDelete.Id);
                return newPage;
            }
            else return NotFound();
        }
    }
}