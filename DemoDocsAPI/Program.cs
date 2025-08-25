using Microsoft.AspNetCore.Authentication;
using DemoDocsAPI.Authentication;

var builder = WebApplication.CreateBuilder(args);

// Dummy authentication
builder.Services.AddAuthentication("DummyScheme")
    .AddScheme<AuthenticationSchemeOptions, DummyAuthHandler>("DummyScheme", null);

builder.Services.AddAuthorization();

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
