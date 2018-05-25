using System;
using System.Runtime.Serialization;

namespace ServiceLayer.Core.Exceptions
{
    public class ParametroNaoCadastradoException : Exception
    {
        public ParametroNaoCadastradoException() 
            : base() { }

        public ParametroNaoCadastradoException(String message) 
            : base(message) { }

        public ParametroNaoCadastradoException(String message, Exception innerException)
            : base(message, innerException) { }

        public ParametroNaoCadastradoException(SerializationInfo info, StreamingContext  context)
            : base(info, context) { }
    }
}
