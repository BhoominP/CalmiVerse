import sys
import os

# Add the project root directory to Python path
project_root = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_root)

# Now you can import from app
import asyncio
import json
import requests
from app.services.chatbot_service import ai_chatbot_service

async def test_ai_chatbot_locally():
    """Test the AI chatbot with different types of messages"""
    
    print("🧪 Testing AI-Guided First Aid Chatbot")
    print("=" * 50)
    
    test_messages = [
        # Severe cases - should trigger immediate help
        {
            "message": "I want to hurt myself",
            "expected_severity": "severe",
            "description": "Self-harm indication"
        },
        {
            "message": "I can't go on anymore, I want to end it all",
            "expected_severity": "severe", 
            "description": "Suicidal ideation"
        },
        
        # Moderate cases - should provide coping strategies
        {
            "message": "I'm having a panic attack and can't breathe",
            "expected_severity": "moderate",
            "description": "Panic attack"
        },
        {
            "message": "I feel so overwhelmed and depressed lately",
            "expected_severity": "moderate",
            "description": "Depression/overwhelm"
        },
        
        # Mild cases - should provide gentle support
        {
            "message": "I'm really stressed about my upcoming exams",
            "expected_severity": "mild",
            "description": "Exam stress"
        },
        {
            "message": "I feel anxious about my presentation tomorrow",
            "expected_severity": "mild",
            "description": "Presentation anxiety"
        },
        
        # General cases - should provide information
        {
            "message": "Hi, what can you help me with?",
            "expected_severity": "general",
            "description": "General greeting"
        }
    ]
    
    for i, test_case in enumerate(test_messages, 1):
        print(f"\n🔬 Test {i}: {test_case['description']}")
        print(f"📝 Message: '{test_case['message']}'")
        print("-" * 40)
        
        # Process the message through our AI
        response = await ai_chatbot_service.process_message(
            user_message=test_case['message'],
            user_id=f"test_user_{i}"
        )
        
        # Check results
        detected_severity = response['severity_detected']
        urgency = response.get('urgency', 'none')
        needs_referral = response['needs_professional_referral']
        
        print(f"✅ Severity Detected: {detected_severity}")
        print(f"⚡ Urgency Level: {urgency}")
        print(f"🏥 Needs Professional Help: {needs_referral}")
        
        # Show part of the response
        response_text = response['response'][:200] + "..." if len(response['response']) > 200 else response['response']
        print(f"💬 Response Preview: {response_text}")
        
        # Check if detection matches expectation
        if detected_severity == test_case['expected_severity']:
            print("✅ PASS - Severity detection correct")
        else:
            print(f"❌ FAIL - Expected {test_case['expected_severity']}, got {detected_severity}")
        
        if response.get('follow_up_options'):
            print(f"🔄 Follow-up Options: {len(response['follow_up_options'])} available")

def test_api_endpoints():
    """Test the API endpoints if server is running"""
    
    print("\n🌐 Testing API Endpoints")
    print("=" * 50)
    
    base_url = "http://localhost:5000/api/chatbot"
    
    test_api_cases = [
        {
            "endpoint": "/chat",
            "method": "POST",
            "data": {
                "message": "I'm feeling very anxious about my exams",
                "user_id": "test_api_user"
            }
        },
        {
            "endpoint": "/start-breathing-exercise", 
            "method": "POST",
            "data": {}
        },
        {
            "endpoint": "/get-crisis-help",
            "method": "GET",
            "data": None
        }
    ]
    
    for test in test_api_cases:
        print(f"\n🔗 Testing {test['method']} {test['endpoint']}")
        
        try:
            url = base_url + test['endpoint']
            
            if test['method'] == 'POST':
                response = requests.post(url, json=test['data'], timeout=10)
            else:
                response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                print("✅ PASS - Endpoint responding correctly")
                result = response.json()
                if result.get('success'):
                    print("✅ PASS - Response format correct")
                else:
                    print("❌ FAIL - Response indicates error")
            else:
                print(f"❌ FAIL - Status code: {response.status_code}")
                
        except requests.exceptions.ConnectionError:
            print("❌ FAIL - Server not running (start with 'python main.py')")
        except Exception as e:
            print(f"❌ FAIL - Error: {e}")

if __name__ == "__main__":
    print("🚀 Starting AI Chatbot Tests...")
    
    # Test 1: Local AI processing
    asyncio.run(test_ai_chatbot_locally())
    
    # Test 2: API endpoints (requires server to be running)
    test_api_endpoints()
    
    print("\n✨ Testing completed!")
    print("💡 To run the server: python main.py")
    print("💡 Then test API at: http://localhost:5000/api/chatbot/chat")