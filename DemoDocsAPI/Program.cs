using Microsoft.AspNetCore.Authentication;
using DemoDocsAPI.Authentication;

var builder = WebApplication.CreateBuilder(args);

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

// Dummy authentication
builder.Services.AddAuthentication("DummyScheme")
    .AddScheme<AuthenticationSchemeOptions, DummyAuthHandler>("DummyScheme", null);

builder.Services.AddAuthorization();
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowReactDev");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
