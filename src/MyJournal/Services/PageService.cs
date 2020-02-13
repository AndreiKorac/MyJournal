using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MyJournal.Models;

namespace MyJournal.Services
{
    // Page Service will handle both Pages and Entries
    // Because Entries exist only in the context of Pages and can be considered Properties of a Page object
    // This is reflected in the Mongo document structure, in which Entries will exist as nested objects within the Page
    // Likewise Entries in our real journal exist in the context of date-labeled Pages
    // This is the design reasoning for keeping Entries and Pages in one place
    public class PageService
    {
        private readonly IMongoCollection<Page> _pages;

        public PageService(IMyJournalDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _pages = database.GetCollection<Page>(settings.PagesCollectionName);
        }

        // Get all pages (in the future will likely want this to be all for some userId
        public List<Page> Get() => _pages.Find(page => true).ToList();

        public Page Get(string id) => _pages.Find(page => page.Id == id).FirstOrDefault();

        // Will likely want to do some sort of error handling/transactional logic - what if insert fails?
        public Page CreatePage(Page page)
        {
            _pages.InsertOne(page);
            return page;
        }

        // TODO add Entry to existing Page
        // TODO update existing Entry in existing Page
        // TODO delete Entry in Page

        public void Delete(Page pageIn) => _pages.DeleteOne(page => page.Id == pageIn.Id);

        public void Delete(string id) => _pages.DeleteOne(page => page.Id == id);
    }
}
