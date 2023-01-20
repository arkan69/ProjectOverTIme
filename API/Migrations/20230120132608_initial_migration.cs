using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class initialmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tb_m_departments",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    address = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_m_departments", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tb_m_roles",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_m_roles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tb_m_splk",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    lemburid = table.Column<int>(name: "lembur_id", type: "int", nullable: false),
                    startdate = table.Column<DateTime>(name: "start_date", type: "datetime2", nullable: false),
                    enddate = table.Column<DateTime>(name: "end_date", type: "datetime2", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false),
                    proofovertime = table.Column<byte[]>(name: "proof_overtime", type: "varbinary(max)", nullable: false),
                    hoursofot = table.Column<int>(name: "hours_of_ot", type: "int", nullable: false),
                    salaryot = table.Column<double>(name: "salary_ot", type: "float", nullable: false),
                    enddateapproval = table.Column<DateTime>(name: "end_date_approval", type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_m_splk", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tb_m_employees",
                columns: table => new
                {
                    nik = table.Column<string>(type: "nchar(5)", nullable: false),
                    firstname = table.Column<string>(name: "first_name", type: "nvarchar(25)", maxLength: 25, nullable: false),
                    lastname = table.Column<string>(name: "last_name", type: "nvarchar(25)", maxLength: 25, nullable: false),
                    phone = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    birthdate = table.Column<DateTime>(name: "birth_date", type: "datetime2", nullable: false),
                    salary = table.Column<int>(type: "int", nullable: false),
                    gender = table.Column<int>(type: "int", nullable: false),
                    ManagerId = table.Column<string>(type: "nchar(5)", nullable: true),
                    DepartmentId = table.Column<int>(type: "int", nullable: false),
                    SplkId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_m_employees", x => x.nik);
                    table.UniqueConstraint("AK_tb_m_employees_phone", x => x.phone);
                    table.ForeignKey(
                        name: "FK_tb_m_employees_tb_m_departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "tb_m_departments",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_m_employees_tb_m_employees_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "tb_m_employees",
                        principalColumn: "nik");
                    table.ForeignKey(
                        name: "FK_tb_m_employees_tb_m_splk_SplkId",
                        column: x => x.SplkId,
                        principalTable: "tb_m_splk",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_m_accounts",
                columns: table => new
                {
                    nik = table.Column<string>(type: "nchar(5)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_m_accounts", x => x.nik);
                    table.UniqueConstraint("AK_tb_m_accounts_email", x => x.email);
                    table.ForeignKey(
                        name: "FK_tb_m_accounts_tb_m_employees_nik",
                        column: x => x.nik,
                        principalTable: "tb_m_employees",
                        principalColumn: "nik",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_r_accounts_roles",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    accountnik = table.Column<string>(name: "account_nik", type: "nchar(5)", nullable: false),
                    roleid = table.Column<int>(name: "role_id", type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_r_accounts_roles", x => x.id);
                    table.ForeignKey(
                        name: "FK_tb_r_accounts_roles_tb_m_accounts_account_nik",
                        column: x => x.accountnik,
                        principalTable: "tb_m_accounts",
                        principalColumn: "nik",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_r_accounts_roles_tb_m_roles_role_id",
                        column: x => x.roleid,
                        principalTable: "tb_m_roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tb_m_employees_DepartmentId",
                table: "tb_m_employees",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_m_employees_ManagerId",
                table: "tb_m_employees",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_m_employees_SplkId",
                table: "tb_m_employees",
                column: "SplkId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_tb_r_accounts_roles_account_nik",
                table: "tb_r_accounts_roles",
                column: "account_nik");

            migrationBuilder.CreateIndex(
                name: "IX_tb_r_accounts_roles_role_id",
                table: "tb_r_accounts_roles",
                column: "role_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tb_r_accounts_roles");

            migrationBuilder.DropTable(
                name: "tb_m_accounts");

            migrationBuilder.DropTable(
                name: "tb_m_roles");

            migrationBuilder.DropTable(
                name: "tb_m_employees");

            migrationBuilder.DropTable(
                name: "tb_m_departments");

            migrationBuilder.DropTable(
                name: "tb_m_splk");
        }
    }
}
