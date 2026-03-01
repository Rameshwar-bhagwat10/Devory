import Link from 'next/link';

export default function MLProjectsGuide() {
  return (
    <div className="text-white/80 leading-relaxed space-y-8">
      <p className="text-xl text-white/90 font-medium">
        Want to break into <strong>machine learning</strong> and build impressive AI projects? This comprehensive 
        guide covers everything from beginner-friendly ML projects to advanced deep learning applications. Perfect 
        for students, developers, and anyone looking to master artificial intelligence.
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why Learn Machine Learning?</h2>
      <p>
        <strong>Machine learning</strong> is transforming every industry - from healthcare to finance, from 
        entertainment to transportation. Learning ML opens doors to high-paying careers, cutting-edge research 
        opportunities, and the ability to build intelligent systems that solve real-world problems.
      </p>

      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 my-8">
        <h3 className="text-xl font-bold text-white mb-3">What You&apos;ll Master</h3>
        <ul className="space-y-2 text-white/70">
          <li>✓ Python programming for ML</li>
          <li>✓ Data preprocessing and feature engineering</li>
          <li>✓ Supervised & unsupervised learning</li>
          <li>✓ Deep learning with TensorFlow & PyTorch</li>
          <li>✓ Model deployment and MLOps</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Prerequisites for ML Projects</h2>
      <p>
        Before diving into <strong>machine learning projects</strong>, you should have:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Python Basics:</strong> Variables, functions, loops, and OOP concepts</li>
        <li><strong>Mathematics:</strong> Linear algebra, calculus, probability, and statistics</li>
        <li><strong>Libraries:</strong> NumPy, Pandas, Matplotlib for data manipulation</li>
        <li><strong>ML Fundamentals:</strong> Basic understanding of algorithms and concepts</li>
      </ul>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Beginner ML Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">1. House Price Prediction</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 1-2 weeks
      </p>
      <p>
        Build a regression model to predict house prices based on features like location, size, and amenities. 
        This classic project teaches you data preprocessing, feature engineering, and linear regression.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, Pandas, Scikit-learn, Matplotlib
      </p>
      <p className="text-white/60 text-sm">
        <strong>Dataset:</strong> Kaggle House Prices dataset
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">2. Iris Flower Classification</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 3-5 days
      </p>
      <p>
        Classify iris flowers into three species using their measurements. Perfect first classification project 
        to learn about decision trees, random forests, and model evaluation metrics.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, Scikit-learn, Seaborn
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">3. Spam Email Detector</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 1 week
      </p>
      <p>
        Build a text classification model to detect spam emails. Learn natural language processing (NLP) basics, 
        text preprocessing, and classification algorithms like Naive Bayes.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, NLTK, Scikit-learn, TF-IDF
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">4. Movie Recommendation System</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 1-2 weeks
      </p>
      <p>
        Create a recommendation engine using collaborative filtering. Learn about similarity metrics, matrix 
        factorization, and how Netflix-style recommendations work.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, Pandas, Scikit-learn, Surprise library
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">5. Customer Segmentation</h3>
      <p>
        <strong>Difficulty:</strong> Beginner | <strong>Time:</strong> 1 week
      </p>
      <p>
        Use K-means clustering to segment customers based on purchasing behavior. Learn unsupervised learning 
        and how businesses use ML for marketing insights.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, Scikit-learn, Matplotlib, Seaborn
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Intermediate ML Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">6. Image Classification with CNN</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 2-3 weeks
      </p>
      <p>
        Build a convolutional neural network to classify images (e.g., cats vs dogs, CIFAR-10). Learn deep 
        learning fundamentals, CNN architecture, and transfer learning.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, TensorFlow/Keras, OpenCV
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">7. Sentiment Analysis Tool</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 2-3 weeks
      </p>
      <p>
        Analyze sentiment in tweets, reviews, or comments using NLP. Implement LSTM networks for sequence 
        modeling and learn about word embeddings (Word2Vec, GloVe).
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, TensorFlow, NLTK, Transformers
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">8. Stock Price Predictor</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 3-4 weeks
      </p>
      <p>
        Predict stock prices using time series analysis and LSTM networks. Learn about financial data, technical 
        indicators, and sequence prediction models.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, TensorFlow, Pandas, yfinance
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">9. Face Recognition System</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 2-3 weeks
      </p>
      <p>
        Build a face detection and recognition system using deep learning. Learn about facial landmarks, 
        embeddings, and real-time video processing.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, OpenCV, dlib, face_recognition
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">10. Chatbot with NLP</h3>
      <p>
        <strong>Difficulty:</strong> Intermediate | <strong>Time:</strong> 3-4 weeks
      </p>
      <p>
        Create an intelligent chatbot using natural language understanding. Implement intent classification, 
        entity extraction, and dialogue management.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, Rasa, spaCy, TensorFlow
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Advanced ML Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">11. Object Detection System</h3>
      <p>
        <strong>Difficulty:</strong> Advanced | <strong>Time:</strong> 4-6 weeks
      </p>
      <p>
        Implement YOLO or Faster R-CNN for real-time object detection. Learn about anchor boxes, non-max 
        suppression, and model optimization for edge devices.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, PyTorch, OpenCV, YOLO
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">12. Generative AI with GANs</h3>
      <p>
        <strong>Difficulty:</strong> Advanced | <strong>Time:</strong> 5-6 weeks
      </p>
      <p>
        Build a Generative Adversarial Network to create synthetic images. Learn about generator-discriminator 
        architecture, training stability, and creative AI applications.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, PyTorch, TensorFlow, DCGAN
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">13. Autonomous Driving Simulation</h3>
      <p>
        <strong>Difficulty:</strong> Advanced | <strong>Time:</strong> 6-8 weeks
      </p>
      <p>
        Create a self-driving car simulation using reinforcement learning. Implement lane detection, object 
        tracking, and decision-making algorithms.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Python, PyTorch, OpenAI Gym, CARLA
      </p>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 my-8">
        <h3 className="text-xl font-bold text-white mb-3">💡 ML Project Best Practices</h3>
        <ul className="space-y-3 text-white/70">
          <li><strong className="text-white">Start with Data:</strong> Good data beats complex algorithms</li>
          <li><strong className="text-white">Baseline First:</strong> Build simple models before complex ones</li>
          <li><strong className="text-white">Version Control:</strong> Track experiments with MLflow or Weights & Biases</li>
          <li><strong className="text-white">Document Everything:</strong> Keep detailed notes on experiments</li>
          <li><strong className="text-white">Deploy Models:</strong> Make your ML models accessible via APIs</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Essential ML Tools & Libraries</h2>
      <p>
        To build <strong>machine learning projects</strong>, you&apos;ll need these tools:
      </p>

      <h3 className="text-xl font-bold text-white mt-6 mb-3">Core Libraries</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>NumPy:</strong> Numerical computing and array operations</li>
        <li><strong>Pandas:</strong> Data manipulation and analysis</li>
        <li><strong>Scikit-learn:</strong> Traditional ML algorithms</li>
        <li><strong>TensorFlow/Keras:</strong> Deep learning framework</li>
        <li><strong>PyTorch:</strong> Research-focused deep learning</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-6 mb-3">Visualization</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Matplotlib:</strong> Basic plotting and visualization</li>
        <li><strong>Seaborn:</strong> Statistical data visualization</li>
        <li><strong>Plotly:</strong> Interactive visualizations</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-6 mb-3">Deployment</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Flask/FastAPI:</strong> Create ML APIs</li>
        <li><strong>Streamlit:</strong> Build ML web apps quickly</li>
        <li><strong>Docker:</strong> Containerize ML applications</li>
        <li><strong>AWS SageMaker:</strong> Cloud ML deployment</li>
      </ul>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Learning Path for ML Students</h2>
      <p>
        Follow this structured path to master <strong>machine learning</strong>:
      </p>

      <div className="space-y-4 mt-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">Phase 1: Foundations (2-3 months)</h4>
          <ul className="text-white/70 space-y-1 text-sm">
            <li>• Master Python programming</li>
            <li>• Learn NumPy, Pandas, Matplotlib</li>
            <li>• Study linear algebra and statistics</li>
            <li>• Complete 3-5 beginner projects</li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">Phase 2: Core ML (3-4 months)</h4>
          <ul className="text-white/70 space-y-1 text-sm">
            <li>• Learn Scikit-learn thoroughly</li>
            <li>• Master supervised learning algorithms</li>
            <li>• Study unsupervised learning techniques</li>
            <li>• Build 5-7 intermediate projects</li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">Phase 3: Deep Learning (4-6 months)</h4>
          <ul className="text-white/70 space-y-1 text-sm">
            <li>• Learn TensorFlow or PyTorch</li>
            <li>• Master CNNs, RNNs, and Transformers</li>
            <li>• Study NLP and Computer Vision</li>
            <li>• Complete 3-5 advanced projects</li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-2">Phase 4: Specialization (3-6 months)</h4>
          <ul className="text-white/70 space-y-1 text-sm">
            <li>• Choose a specialization (NLP, CV, RL)</li>
            <li>• Learn MLOps and deployment</li>
            <li>• Build production-ready systems</li>
            <li>• Contribute to open source</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Common Mistakes to Avoid</h2>
      <ul className="list-disc list-inside space-y-3 ml-4">
        <li>
          <strong>Jumping to Deep Learning Too Soon:</strong> Master traditional ML first before deep learning
        </li>
        <li>
          <strong>Ignoring Data Quality:</strong> Garbage in, garbage out - always clean and validate your data
        </li>
        <li>
          <strong>Overfitting:</strong> Use cross-validation and regularization to prevent overfitting
        </li>
        <li>
          <strong>Not Understanding Math:</strong> Don&apos;t skip the mathematical foundations
        </li>
        <li>
          <strong>Tutorial Hell:</strong> Build your own projects instead of just following tutorials
        </li>
      </ul>

      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-8 my-12">
        <h3 className="text-2xl font-bold text-white mb-4">Explore ML Projects on Devory</h3>
        <p className="text-white/70 mb-6">
          Ready to start your machine learning journey? Explore 50+ curated ML projects with detailed 
          implementation guides, dataset recommendations, and step-by-step roadmaps.
        </p>
        <Link
          href="/projects"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          Browse ML Projects →
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Conclusion</h2>
      <p>
        <strong>Machine learning</strong> is one of the most exciting and rewarding fields in technology. 
        Start with beginner projects to build confidence, progress through intermediate projects to deepen 
        your understanding, and tackle advanced projects to master cutting-edge techniques.
      </p>
      <p className="mt-4">
        Remember: consistency is key. Dedicate time every day to learning, building, and experimenting. 
        The ML community is incredibly supportive - don&apos;t hesitate to ask questions and share your work.
      </p>
      <p className="mt-4 text-white/60 italic">
        Happy learning! 🤖
      </p>
    </div>
  );
}
