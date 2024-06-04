using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Routes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Number = table.Column<int>(type: "integer", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Routes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Saccos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Saccos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StopDuration",
                columns: table => new
                {
                    Stop = table.Column<string>(type: "text", nullable: false),
                    Duration = table.Column<TimeSpan>(type: "interval", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "Streets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Number = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Streets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Matatus",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    StreetId = table.Column<int>(type: "integer", nullable: false),
                    RouteId = table.Column<int>(type: "integer", nullable: false),
                    SaccoNameId = table.Column<int>(type: "integer", nullable: false),
                    TimeOfOperation = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Fare = table.Column<decimal>(type: "numeric", nullable: false),
                    Capacity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matatus", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Matatus_Routes_RouteId",
                        column: x => x.RouteId,
                        principalTable: "Routes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Matatus_Saccos_SaccoNameId",
                        column: x => x.SaccoNameId,
                        principalTable: "Saccos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Matatus_Streets_StreetId",
                        column: x => x.StreetId,
                        principalTable: "Streets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Matatus_RouteId",
                table: "Matatus",
                column: "RouteId");

            migrationBuilder.CreateIndex(
                name: "IX_Matatus_SaccoNameId",
                table: "Matatus",
                column: "SaccoNameId");

            migrationBuilder.CreateIndex(
                name: "IX_Matatus_StreetId",
                table: "Matatus",
                column: "StreetId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Matatus");

            migrationBuilder.DropTable(
                name: "StopDuration");

            migrationBuilder.DropTable(
                name: "Routes");

            migrationBuilder.DropTable(
                name: "Saccos");

            migrationBuilder.DropTable(
                name: "Streets");
        }
    }
}
