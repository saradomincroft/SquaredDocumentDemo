using Microsoft.AspNetCore.Authentication;
using DemoDocsAPI.Authentication;

var builder = WebApplication.CreateBuilder(args);

// ------------------ CORS ------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// ------------------ Authentication ------------------
builder.Services.AddAuthentication("DummyScheme")
    .AddScheme<AuthenticationSchemeOptions, DummyAuthHandler>("DummyScheme", null);

builder.Services.AddAuthorization();
builder.Services.AddControllers();

var app = builder.Build();

// ------------------ Middleware ------------------
app.UseCors("AllowReactDev");

app.UseHttpsRedirection();

// ------------------ Serve React frontend ------------------
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

// ------------------ Map API controllers ------------------
app.MapControllers();

// Fallback to index.html for React routing
app.MapFallbackToFile("index.html");

app.Run();
