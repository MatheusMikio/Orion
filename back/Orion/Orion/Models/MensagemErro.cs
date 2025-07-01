namespace Orion.Models
{
    public class MensagemErro
    {
        public string Propriedade { get; set; }
        public string Mensagem { get; set; }
        public MensagemErro(string propriedade, string mensagem)
        {
            Propriedade = propriedade;
            Mensagem = mensagem;
        }
    }
}
