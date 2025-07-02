using NHibernate.Cfg;
using Orion.Repository;
using Orion.Repository.Interfaces;
using Orion.Services;
using Orion.Services.Interfaces;

namespace Orion
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddScoped<IClienteService, ClienteService>();
            builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
            builder.Services.AddScoped<IDividaService, DividaService>();
            builder.Services.AddScoped<IDividaRepository, DividaRepository>();

            var connectionString = builder.Configuration
        .GetConnectionString("Default");
            builder.Services.AddSingleton(c =>
            {
                var config = new Configuration().Configure();
                config.DataBaseIntegration(
                    x => x.ConnectionString = connectionString
                );
                return config.BuildSessionFactory();
            });


            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(
                b => b.AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin()
            );

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
