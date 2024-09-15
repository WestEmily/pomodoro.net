using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pomodoro.Models.DTO;

[Table("affirmations")]
public partial class Affirmation
{
    [Key]
    [Column("Id")]
    public int Id { get; set; }

    [Column("Description")]
    public string Description { get; set; }
}
