using MyJournal.Models;
using System.Collections.Generic;

namespace MyJournal.Interfaces
{
    public interface IPageService
    {
        Page CreateEntry(string pageId, Entry entry);
        Page CreatePage(Page page);
        void Delete(string id);
        Page DeleteEntry(string pageId, string entryId);
        List<Page> Get();
        Page Get(string id);
        Page UpdateEntry(string pageId, Entry entry);
    }
}