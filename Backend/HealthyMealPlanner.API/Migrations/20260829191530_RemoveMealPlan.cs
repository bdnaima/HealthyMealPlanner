using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyMealPlanner.API.Migrations
{
    /// <inheritdoc />
    public partial class RemoveMealPlan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlannedMeals_MealPlans_MealPlanId",
                table: "PlannedMeals");

            migrationBuilder.DropTable(
                name: "MealPlans");

            migrationBuilder.DropIndex(
                name: "IX_PlannedMeals_MealPlanId",
                table: "PlannedMeals");

            migrationBuilder.DropColumn(
                name: "MealPlanId",
                table: "PlannedMeals");

            migrationBuilder.DropColumn(
                name: "MealType",
                table: "PlannedMeals");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MealPlanId",
                table: "PlannedMeals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "MealType",
                table: "PlannedMeals",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MealPlans",
                columns: table => new
                {
                    MealPlanId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EndDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StartDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    UserId = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealPlans", x => x.MealPlanId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PlannedMeals_MealPlanId",
                table: "PlannedMeals",
                column: "MealPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlannedMeals_MealPlans_MealPlanId",
                table: "PlannedMeals",
                column: "MealPlanId",
                principalTable: "MealPlans",
                principalColumn: "MealPlanId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
