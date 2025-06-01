/**
 * CoverageCarol Quiz - Perfect Functionality
 * Fixed to work flawlessly with our beautiful design
 */

class CoverageCarolQuiz {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.questions = this.initializeQuestions();
        this.totalQuestions = this.questions.length;
        
        this.init();
    }

    /**
     * Initialize Questions - Easy to Hard for Maximum Completion
     */
    initializeQuestions() {
        return [
            // Question 1: Age (EASY - already committed)
            {
                id: 'age',
                type: 'choice',
                title: "What's your current age?",
                subtitle: "This helps us find the most suitable coverage options for your needs",
                options: [
                    { value: '50-55', label: '50-55 years old' },
                    { value: '56-60', label: '56-60 years old' },
                    { value: '61-65', label: '61-65 years old' },
                    { value: '66-70', label: '66-70 years old' },
                    { value: '71-75', label: '71-75 years old' },
                    { value: '76-80', label: '76-80 years old' },
                    { value: '81+', label: '81+ years old' }
                ]
            },
            
            // Question 2: Coverage Amount (EASY - gets them thinking value)
            {
                id: 'coverage',
                type: 'choice',
                title: "How much coverage are you looking for?",
                subtitle: "Consider funeral costs, final expenses, and what you'd like to leave behind",
                options: [
                    { value: '5000-10000', label: '$5,000 - $10,000' },
                    { value: '10000-15000', label: '$10,000 - $15,000 (Most Popular)' },
                    { value: '15000-25000', label: '$15,000 - $25,000' },
                    { value: '25000-50000', label: '$25,000 - $50,000' },
                    { value: '50000+', label: '$50,000+' },
                    { value: 'not-sure', label: "I'm not sure - help me decide" }
                ]
            },
            
            // Question 3: Health Status (MEDIUM - still general)
            {
                id: 'health',
                type: 'choice',
                title: "How would you describe your current health?",
                subtitle: "This helps us match you with the right type of policy and pricing",
                options: [
                    { value: 'excellent', label: 'Excellent - No health issues' },
                    { value: 'good', label: 'Good - Minor conditions, well managed' },
                    { value: 'fair', label: 'Fair - Some health concerns' },
                    { value: 'poor', label: 'Poor - Serious health issues' },
                    { value: 'prefer-not-say', label: 'Prefer not to say' }
                ]
            },
            
            // Question 4: Location (EASY - just ZIP code)
            {
                id: 'location',
                type: 'input',
                title: "What's your ZIP code?",
                subtitle: "We'll connect you with licensed specialists in your area",
                inputs: [
                    {
                        id: 'zipCode',
                        type: 'text',
                        placeholder: 'Enter your ZIP code (e.g. 12345)',
                        label: 'ZIP Code'
                    }
                ]
            },
            
            // Question 5: Contact Info (HARDER - personal information)
            {
                id: 'contact',
                type: 'contact',
                title: "How can we reach you with your personalized quotes?",
                subtitle: "Your licensed specialist will contact you within 24 hours",
                inputs: [
                    {
                        id: 'firstName',
                        type: 'text',
                        placeholder: 'First name',
                        label: 'First Name'
                    },
                    {
                        id: 'lastName',
                        type: 'text',
                        placeholder: 'Last name',
                        label: 'Last Name'
                    },
                    {
                        id: 'phoneNumber',
                        type: 'tel',
                        placeholder: '(555) 123-4567',
                        label: 'Phone Number'
                    },
                    {
                        id: 'emailAddress',
                        type: 'email',
                        placeholder: 'your.email@example.com',
                        label: 'Email Address'
                    }
                ]
            },
            
            // Question 6: Contact Preferences (EASY finish - builds commitment)
            {
                id: 'preferences',
                type: 'choice',
                title: "When is the best time to contact you?",
                subtitle: "Choose your preferred time so we can reach you when it's convenient",
                options: [
                    { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
                    { value: 'afternoon', label: 'Afternoon (12 PM - 5 PM)' },
                    { value: 'evening', label: 'Evening (5 PM - 8 PM)' },
                    { value: 'anytime', label: 'Anytime is fine' }
                ]
            }
        ];
    }

    /**
     * Initialize Quiz
     */
    init() {
        this.initializeElements();
        this.setupEventListeners();
        this.renderQuestion();
        this.updateProgress();
    }

    /**
     * Initialize DOM Elements
     */
    initializeElements() {
        this.elements = {
            questionTitle: document.querySelector('.question-title'),
            questionSubtitle: document.querySelector('.question-subtitle'),
            answersGrid: document.getElementById('answersGrid'),
            backBtn: document.getElementById('backBtn'),
            nextBtn: document.getElementById('nextBtn'),
            nextText: document.getElementById('nextText'),
            progressFill: document.getElementById('progressFill'),
            currentStep: document.getElementById('currentStep'),
            loadingOverlay: document.getElementById('loadingOverlay')
        };

        // Debug log
        console.log('🔧 Quiz elements initialized:', {
            questionTitle: !!this.elements.questionTitle,
            answersGrid: !!this.elements.answersGrid,
            backBtn: !!this.elements.backBtn,
            nextBtn: !!this.elements.nextBtn
        });
    }

    /**
     * Setup Event Listeners
     */
    setupEventListeners() {
        if (this.elements.backBtn) {
            this.elements.backBtn.addEventListener('click', () => this.previousQuestion());
        }
        
        if (this.elements.nextBtn) {
            this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        }

        // Enter key navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.elements.nextBtn && !this.elements.nextBtn.disabled) {
                this.nextQuestion();
            }
        });
    }

    /**
     * Update Progress
     */
    updateProgress() {
        const progressPercent = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
        
        if (this.elements.progressFill) {
            this.elements.progressFill.style.width = `${progressPercent}%`;
        }

        if (this.elements.currentStep) {
            this.elements.currentStep.textContent = this.currentQuestionIndex + 1;
        }

        this.updateNavigationButtons();
    }

    /**
     * Update Navigation Buttons
     */
    updateNavigationButtons() {
        // Back button
        if (this.elements.backBtn) {
            this.elements.backBtn.disabled = this.currentQuestionIndex === 0;
        }

        // Next button
        const currentQuestion = this.questions[this.currentQuestionIndex];
        const isAnswered = this.isQuestionAnswered(currentQuestion);
        
        if (this.elements.nextBtn) {
            this.elements.nextBtn.disabled = !isAnswered;
        }
        
        // Update button text
        if (this.elements.nextText) {
            if (this.currentQuestionIndex === this.totalQuestions - 1) {
                this.elements.nextText.textContent = 'Find My Specialist';
            } else {
                this.elements.nextText.textContent = 'Continue';
            }
        }
    }

    /**
     * Check if Current Question is Answered
     */
    isQuestionAnswered(question) {
        const answer = this.answers[question.id];
        if (!answer) return false;

        switch (question.type) {
            case 'choice':
                return !!answer.value;
            case 'input':
                return question.inputs.every(input => {
                    const value = answer[input.id];
                    if (input.id === 'zipCode') {
                        return value && value.length === 5 && /^\d{5}$/.test(value);
                    }
                    return value && value.trim().length > 0;
                });
            case 'contact':
                return question.inputs.every(input => {
                    const value = answer[input.id];
                    if (!value || value.trim().length === 0) return false;
                    
                    // Email validation
                    if (input.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        return emailRegex.test(value);
                    }
                    
                    // Phone validation (at least 10 digits)
                    if (input.type === 'tel') {
                        const phoneDigits = value.replace(/\D/g, '');
                        return phoneDigits.length >= 10;
                    }
                    
                    return true;
                });
            default:
                return false;
        }
    }

    /**
     * Render Current Question
     */
    renderQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        if (!question) return;

        console.log('🎯 Rendering question:', question.id, question.title);

        // Update question text
        if (this.elements.questionTitle) {
            this.elements.questionTitle.textContent = question.title;
        }
        
        if (this.elements.questionSubtitle) {
            this.elements.questionSubtitle.textContent = question.subtitle;
        }

        // Render answer area
        this.renderAnswerArea(question);
        
        // Setup event listeners for this question
        setTimeout(() => {
            this.setupQuestionEventListeners(question);
            this.restoreAnswers(question);
        }, 50);
    }

    /**
     * Render Answer Area
     */
    renderAnswerArea(question) {
        if (!this.elements.answersGrid) return;

        let answerHTML = '';

        switch (question.type) {
            case 'choice':
                // Use the same grid structure as HTML
                answerHTML = question.options.map(option => `
                    <button class="answer-option" data-value="${option.value}">
                        ${option.label}
                    </button>
                `).join('');
                break;

            case 'input':
                answerHTML = `
                    <div class="input-container">
                        ${question.inputs.map(input => `
                            <div class="input-group">
                                <label class="input-label">${input.label}</label>
                                <input 
                                    type="${input.type}"
                                    id="${input.id}"
                                    class="form-input"
                                    placeholder="${input.placeholder}"
                                    maxlength="5"
                                >
                            </div>
                        `).join('')}
                    </div>
                `;
                break;

            case 'contact':
                answerHTML = `
                    <div class="contact-form">
                        <div class="input-row">
                            <div class="input-group">
                                <label class="input-label">${question.inputs[0].label}</label>
                                <input 
                                    type="${question.inputs[0].type}"
                                    id="${question.inputs[0].id}"
                                    class="form-input"
                                    placeholder="${question.inputs[0].placeholder}"
                                >
                            </div>
                            <div class="input-group">
                                <label class="input-label">${question.inputs[1].label}</label>
                                <input 
                                    type="${question.inputs[1].type}"
                                    id="${question.inputs[1].id}"
                                    class="form-input"
                                    placeholder="${question.inputs[1].placeholder}"
                                >
                            </div>
                        </div>
                        <div class="input-row">
                            <div class="input-group">
                                <label class="input-label">${question.inputs[2].label}</label>
                                <input 
                                    type="${question.inputs[2].type}"
                                    id="${question.inputs[2].id}"
                                    class="form-input"
                                    placeholder="${question.inputs[2].placeholder}"
                                >
                            </div>
                            <div class="input-group">
                                <label class="input-label">${question.inputs[3].label}</label>
                                <input 
                                    type="${question.inputs[3].type}"
                                    id="${question.inputs[3].id}"
                                    class="form-input"
                                    placeholder="${question.inputs[3].placeholder}"
                                >
                            </div>
                        </div>
                    </div>
                `;
                break;
        }

        this.elements.answersGrid.innerHTML = answerHTML;
    }

    /**
     * Setup Question Event Listeners
     */
    setupQuestionEventListeners(question) {
        switch (question.type) {
            case 'choice':
                const options = document.querySelectorAll('.answer-option');
                console.log('🔘 Setting up choice listeners for', options.length, 'options');
                
                options.forEach(option => {
                    option.addEventListener('click', () => {
                        console.log('✅ Option clicked:', option.dataset.value);
                        
                        // Remove selected class from all options
                        options.forEach(opt => opt.classList.remove('selected'));
                        
                        // Add selected class to clicked option
                        option.classList.add('selected');

                        // Store answer
                        this.answers[question.id] = {
                            value: option.dataset.value,
                            label: option.textContent.trim()
                        };

                        console.log('💾 Answer stored:', this.answers[question.id]);
                        this.updateNavigationButtons();

                        // Auto-advance after 1 second (except last question)
                        if (this.currentQuestionIndex < this.totalQuestions - 1) {
                            setTimeout(() => {
                                if (this.elements.nextBtn && !this.elements.nextBtn.disabled) {
                                    this.nextQuestion();
                                }
                            }, 1000);
                        }
                    });
                });
                break;

            case 'input':
            case 'contact':
                question.inputs.forEach(inputConfig => {
                    const input = document.getElementById(inputConfig.id);
                    if (!input) {
                        console.warn('⚠️ Input not found:', inputConfig.id);
                        return;
                    }

                    console.log('📝 Setting up input listener for', inputConfig.id);

                    // Phone number formatting
                    if (inputConfig.type === 'tel') {
                        input.addEventListener('input', (e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 6) {
                                value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)}`;
                            } else if (value.length >= 3) {
                                value = `(${value.slice(0,3)}) ${value.slice(3)}`;
                            }
                            e.target.value = value;
                        });
                    }

                    // ZIP code formatting
                    if (inputConfig.id === 'zipCode') {
                        input.addEventListener('input', (e) => {
                            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
                        });
                    }

                    // Store answers and validate
                    input.addEventListener('input', () => {
                        if (!this.answers[question.id]) {
                            this.answers[question.id] = {};
                        }
                        this.answers[question.id][inputConfig.id] = input.value.trim();
                        this.updateNavigationButtons();
                    });

                    // Enter key to advance
                    input.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter' && this.elements.nextBtn && !this.elements.nextBtn.disabled) {
                            this.nextQuestion();
                        }
                    });
                });
                break;
        }
    }

    /**
     * Restore Previous Answers
     */
    restoreAnswers(question) {
        const answer = this.answers[question.id];
        if (!answer) return;

        console.log('🔄 Restoring answers for', question.id, answer);

        switch (question.type) {
            case 'choice':
                if (answer.value) {
                    const option = document.querySelector(`[data-value="${answer.value}"]`);
                    if (option) {
                        option.classList.add('selected');
                        console.log('✅ Restored selection:', answer.value);
                    }
                }
                break;

            case 'input':
            case 'contact':
                question.inputs.forEach(inputConfig => {
                    const input = document.getElementById(inputConfig.id);
                    if (input && answer[inputConfig.id]) {
                        input.value = answer[inputConfig.id];
                        console.log('✅ Restored input:', inputConfig.id, answer[inputConfig.id]);
                    }
                });
                break;
        }
    }

    /**
     * Navigate to Next Question
     */
    nextQuestion() {
        console.log('➡️ Next question clicked, current:', this.currentQuestionIndex);
        
        if (this.currentQuestionIndex >= this.totalQuestions - 1) {
            this.submitQuiz();
            return;
        }

        this.currentQuestionIndex++;
        this.renderQuestion();
        this.updateProgress();
    }

    /**
     * Navigate to Previous Question
     */
    previousQuestion() {
        console.log('⬅️ Previous question clicked, current:', this.currentQuestionIndex);
        
        if (this.currentQuestionIndex <= 0) return;

        this.currentQuestionIndex--;
        this.renderQuestion();
        this.updateProgress();
    }

    /**
     * Submit Quiz
     */
    async submitQuiz() {
        console.log('🚀 Submitting quiz...');
        
        if (!this.isQuestionAnswered(this.questions[this.currentQuestionIndex])) return;

        this.showLoading();

        try {
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Process the lead data
            const leadData = this.processLeadData();
            console.log('💎 High-Quality Lead Generated:', leadData);
            
            this.hideLoading();
            this.showSuccess(leadData);
            
        } catch (error) {
            console.error('❌ Quiz submission error:', error);
            this.hideLoading();
            this.showSuccess(); // Still show success for demo
        }
    }

    /**
     * Process Lead Data - What Insurance Agents Need
     */
    processLeadData() {
        const leadData = {
            // Lead Metadata
            timestamp: new Date().toISOString(),
            source: 'CoverageCarol Quiz',
            leadScore: this.calculateLeadScore(),
            
            // Demographics
            age: this.answers.age?.value || null,
            ageLabel: this.answers.age?.label || null,
            zipCode: this.answers.location?.zipCode || null,
            
            // Insurance Needs
            coverageAmount: this.answers.coverage?.value || null,
            coverageLabel: this.answers.coverage?.label || null,
            healthStatus: this.answers.health?.value || null,
            healthLabel: this.answers.health?.label || null,
            
            // Contact Information
            firstName: this.answers.contact?.firstName || null,
            lastName: this.answers.contact?.lastName || null,
            phoneNumber: this.answers.contact?.phoneNumber || null,
            emailAddress: this.answers.contact?.emailAddress || null,
            preferredContactTime: this.answers.preferences?.value || null,
            preferredContactLabel: this.answers.preferences?.label || null,
            
            // Agent Notes
            agentNotes: this.generateAgentNotes()
        };

        return leadData;
    }

    /**
     * Calculate Lead Score (1-100)
     */
    calculateLeadScore() {
        let score = 50; // Base score

        // Age scoring (older = higher score)
        const age = this.answers.age?.value;
        if (age === '66-70' || age === '71-75') score += 20;
        else if (age === '61-65' || age === '76-80') score += 15;
        else if (age === '56-60' || age === '81+') score += 10;
        else score += 5;

        // Coverage amount scoring
        const coverage = this.answers.coverage?.value;
        if (coverage === '25000-50000' || coverage === '50000+') score += 20;
        else if (coverage === '15000-25000') score += 15;
        else if (coverage === '10000-15000') score += 10;
        else score += 5;

        // Health status scoring
        const health = this.answers.health?.value;
        if (health === 'excellent' || health === 'good') score += 15;
        else if (health === 'fair') score += 10;
        else score += 5;

        // Contact completeness
        if (this.answers.contact?.phoneNumber && this.answers.contact?.emailAddress) {
            score += 10;
        }

        return Math.min(score, 100);
    }

    /**
     * Generate Agent Notes
     */
    generateAgentNotes() {
        const notes = [];
        
        // Age insights
        const age = this.answers.age?.value;
        if (age === '81+') {
            notes.push('Senior prospect - may need simplified application process');
        } else if (age === '50-55') {
            notes.push('Younger prospect - may be price-sensitive');
        }

        // Coverage insights
        const coverage = this.answers.coverage?.value;
        if (coverage === 'not-sure') {
            notes.push('Needs education on coverage amounts - good upsell opportunity');
        } else if (coverage === '50000+') {
            notes.push('High-value prospect with substantial coverage needs');
        }

        // Health insights
        const health = this.answers.health?.value;
        if (health === 'poor') {
            notes.push('May need guaranteed issue or graded benefit policy');
        } else if (health === 'excellent') {
            notes.push('Good candidate for fully underwritten policy with better rates');
        }

        return notes.join(' | ');
    }

    /**
     * Show Loading Screen
     */
    showLoading() {
        if (this.elements.loadingOverlay) {
            this.elements.loadingOverlay.classList.add('active');
        }
    }

    /**
     * Hide Loading Screen
     */
    hideLoading() {
        if (this.elements.loadingOverlay) {
            this.elements.loadingOverlay.classList.remove('active');
        }
    }

    /**
     * Show Success Message
     */
    showSuccess(leadData) {
        if (!leadData) {
            leadData = this.processLeadData();
        }
        
        alert(`🎉 Perfect! Your information has been submitted.

✅ A licensed final expense specialist will contact you within 24 hours with personalized coverage options.

📊 Lead Details:
• Lead Score: ${leadData.leadScore}/100
• Coverage Needed: ${leadData.coverageLabel || 'Not specified'}
• Preferred Contact: ${leadData.preferredContactLabel || 'Not specified'}
• Location: ${leadData.zipCode || 'Not specified'}

🙏 Thank you for choosing CoverageCarol!`);
        
        // In production, redirect to thank you page
        // window.location.href = 'thank-you.html';
    }
}

/**
 * Initialize Quiz When DOM is Ready
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 CoverageCarol Quiz initializing...');
    
    // Wait a moment for all elements to be ready
    setTimeout(() => {
        window.coverageCarolQuiz = new CoverageCarolQuiz();
        console.log('✅ CoverageCarol Quiz ready for conversions!');
    }, 100);
});