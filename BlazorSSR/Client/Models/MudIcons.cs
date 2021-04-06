
namespace BlazorSSR.Client.Models
{
    public class MudIcons
    {
        public string Name { get; set; }
        public string Code { get; set; }

        public MudIcons(string name, string code)
        {
            Name = name;
            Code = code;
        }
    }
}
