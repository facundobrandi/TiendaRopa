namespace TindaRopa_Config.Utils
{
    public class Response
    {
        public int code { get; set; }
        public object data { get; set; }
        public string message { get; set; }
    
        public Response(int code, object data,string message)
        {
            this.code = code;
            this.data = data;
            this.message = message;
        }   
    }
}
