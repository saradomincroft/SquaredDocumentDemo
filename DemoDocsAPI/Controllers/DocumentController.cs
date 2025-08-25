using Microsoft.AspNetCore.Mvc;
using DemoDocsAPI.Models;

namespace DemoDocsAPI.Controllers
{
    [ApiController]
    [Route("api/documents")]
    public class DocumentsController : ControllerBase
    {
        private static readonly List<Document> _documents = new()
        {
            new Document
            {
                Name = "Policy001",
                Url = "https://teststorage.blob.core.windows.net/docs/Policy001.pdf",
                ExpiryDate = new DateTime(2025, 9, 23),
                Status = "Active"
            },
            new Document
            {
                Name = "Policy002",
                Url = "https://teststorage.blob.core.windows.net/docs/Policy002.pdf",
                ExpiryDate = new DateTime(2024, 12, 31),
                Status = "Expired"
            },
            new Document
            {
                Name = "Policy003",
                Url = "https://teststorage.blob.core.windows.net/docs/Policy003.pdf",
                ExpiryDate = new DateTime(2025, 12, 15),
                Status = "Active"
            }
        };

        [HttpGet]
        public IActionResult GetAllDocuments() => Ok(_documents);

        [HttpGet("{name}")]
        public IActionResult GetDocument(string name)
        {
            var doc = _documents.FirstOrDefault(d =>
                d.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
            return doc == null ? NotFound() : Ok(doc);
        }
    }
}
