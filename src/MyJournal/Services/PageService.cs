using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MyJournal.Models;

namespace MyJournal.Services
{
    public class PageService
    {
        private readonly IMongoCollection<Page> _pages;

        public PageService(IMyJournalDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _pages = database.GetCollection<Page>(settings.PagesCollectionName);
        }

        public List<Page> Get()
        {
            var pages = _pages.Find(page => true).ToList();

            return pages;
        }

        public Page Get(string id) 
        {
            var page = _pages.Find(page => page.Id == id).FirstOrDefault();

            return page;
        }

        public Page CreatePage(Page page)
        {
            _pages.InsertOne(page);
            return page;
        }

        public void Delete(string id) => _pages.DeleteOne(page => page.Id == id);

        public Page CreateEntry(string pageId, Entry entry)
        {
            _pages.FindOneAndUpdate(p => p.Id == pageId, Builders<Page>.Update.Push(x => x.Entries, entry));
            return Get(pageId);
        }

        public Page UpdateEntry(string pageId, Entry entry)
        {
            // Finds page with matching pageId and an entry Id that matches that of the given entry, then sets that entry's content to the given content
            _pages.FindOneAndUpdate(p => p.Id == pageId && p.Entries.Any(e => e.Id == entry.Id), Builders<Page>.Update.Set(p => p.Entries[-1].Content, entry.Content));

            return Get(pageId);
        }
        // TODO delete Entry in Page
        public Page DeleteEntry(string pageId, string entryId)
        {
            _pages.FindOneAndUpdate(p => p.Id == pageId && p.Entries.Any(e => e.Id == entryId), Builders<Page>.Update.PullFilter(p => p.Entries[-1].Id, entryId));

            return Get(pageId);
        }
    }
}
