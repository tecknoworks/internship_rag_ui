from datasets import Dataset
import os
from ragas import evaluate
from ragas.metrics import faithfulness, answer_correctness, answer_relevancy, context_precision, context_recall, answer_similarity

os.environ["OPENAI_API_KEY"] = ""

data_samples = {
    'user_input': [
    
    ],
    'response': [
    
    ],
    'retrieved_contexts': [
        [
    
        ]
    ],
    'reference': [
    
    ]
}
 
dataset = Dataset.from_dict(data_samples)
score = evaluate(dataset, metrics=(faithfulness, context_precision, answer_relevancy))
df = score.to_pandas()
df.to_csv('score.csv', index=False)
