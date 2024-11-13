using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TindaRopa_Config.Models
{
    public partial class Tienda_RopaContext : DbContext
    {
        public Tienda_RopaContext()
        {
        }

        public Tienda_RopaContext(DbContextOptions<Tienda_RopaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Categorium> Categoria { get; set; } = null!;
        public virtual DbSet<Producto> Productos { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Host=localhost; Database=Tienda_Ropa; Username=postgres; Password=12345");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categorium>(entity =>
            {
                entity.ToTable("categoria");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.Nombrecategoria)
                    .HasColumnType("character varying")
                    .HasColumnName("nombrecategoria");
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.ToTable("Producto");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.Categoriaid).HasColumnName("categoriaid");

                entity.Property(e => e.Descripcioncorta)
                    .HasColumnType("character varying")
                    .HasColumnName("descripcioncorta");

                entity.Property(e => e.Descripcionlarga)
                    .HasColumnType("character varying")
                    .HasColumnName("descripcionlarga");

                entity.Property(e => e.Imagenurl).HasColumnName("imagenurl");

                entity.Property(e => e.Nombre)
                    .HasColumnType("character varying")
                    .HasColumnName("nombre");

                entity.Property(e => e.Precio).HasColumnName("precio");

                entity.Property(e => e.StockChico).HasColumnName("stock_chico");

                entity.Property(e => e.StockGrande).HasColumnName("stock_grande");

                entity.Property(e => e.StockMedio).HasColumnName("stock_medio");

                entity.HasOne(d => d.Categoria)
                    .WithMany(p => p.Productos)
                    .HasForeignKey(d => d.Categoriaid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("categoriaId");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
