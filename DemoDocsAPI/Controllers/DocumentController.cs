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
                CustomerName = "John Doe",
                Url = "https://teststorage.blob.core.windows.net/docs/Policy001.pdf",
                ExpiryDate = new DateTime(2025, 9, 23),
                Status = "Active"
            },
            new Document
            {
                Name = "Policy002",
                CustomerName = "Ebony Test",
                Url = "https://teststorage.blob.core.windows.net/docs/Policy002.pdf",
                ExpiryDate = new DateTime(2024, 12, 31),
                Status = "Expired"
            },
            new Document
            {
                Name = "Policy003",
                CustomerName = "Mark Demo",
                Url = "https://teststorage.blob.core.windows.net/docs/Policy003.pdf",
                ExpiryDate = new DateTime(2025, 12, 15),
                Status = "Active"
            },
            new Document
            {
                Name = "Policy004",
                CustomerName = "Sara Croft",
                Url = "https://teststorage.blob.core.windows.net/docs/Policy003.pdf",
                ExpiryDate = new DateTime(2025, 08, 29),
                Status = "Active"
            },
            new Document
            {
                Name = "Policy005",
                CustomerName = "Joe Friend",
                Url = "https://teststorage.blob.core.windows.net/docs/Policy003.pdf",
                ExpiryDate = new DateTime(2025, 08, 30),
                Status = "Active"
            },
            new Document
            {
                Name = "Policy006",
                CustomerName = "Ann Tester",
                Url = "https://teststorage.blob.core.windows.net/docs/Policy003.pdf",
                ExpiryDate = new DateTime(2024, 01, 15),
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
