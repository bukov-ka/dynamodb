using System;
using System.Collections.Generic;
using System.Text;

namespace DynamicDBConsole
{
    public class JsonDTO
    {
        public string Infinitive { get; set; }
        public string TenseKey { get; set; }
        public string Word { get; set; }
        public bool IsIrregular { get; set; }
        public int StartIdx { get; set; }
        public int EndIdx { get; set; }
    }
}
