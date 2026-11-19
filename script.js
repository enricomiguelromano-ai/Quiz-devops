const $ = (selector) => document.querySelector(selector);
const screens = { start: $('#startScreen'), quiz: $('#quizScreen'), result: $('#resultScreen') };

const questions = [
  {
    category: 'FUNDAMENTOS', kind: 'MÚLTIPLA ESCOLHA', title: 'O que é cultura DevOps?',
    prompt: 'Selecione a alternativa que melhor representa a proposta da cultura DevOps.', type: 'single',
    options: [
      'Uma abordagem que aproxima Desenvolvimento e Operações, com colaboração e responsabilidade compartilhada.',
      'Um programa usado exclusivamente para armazenar o código-fonte de um software.',
      'Uma metodologia em que Desenvolvimento e Operações trabalham separadamente.',
      'Um conjunto de linguagens de programação para criar sistemas mais rápidos.'
    ], correct: 0,
    explanation: 'DevOps aproxima as equipes de Desenvolvimento (Development) e Operações (Operations), integrando responsabilidades e informações para permitir entregas mais rápidas, frequentes e confiáveis.'
  },
  {
    category: 'COLABORAÇÃO', kind: 'CENÁRIO INTERATIVO', title: 'Derrube o muro da confusão',
    prompt: 'Uma equipe de desenvolvimento quer lançar uma nova função rapidamente. Já a equipe de operações teme que a mudança deixe o sistema instável. Como a cultura DevOps deve lidar com essa situação?', type: 'single',
    options: [
      'Permitir que Desenvolvimento publique sozinho e avise Operações depois.',
      'Fazer as equipes colaborarem, compartilharem informações e dividirem a responsabilidade pelo resultado.',
      'Impedir novas funcionalidades até que o sistema nunca mais apresente erros.',
      'Separar as tarefas para que cada equipe não interfira no trabalho da outra.'
    ], correct: 1,
    explanation: 'O “muro da confusão” representa a separação e o conflito entre os objetivos das equipes. DevOps busca derrubar esse muro por meio de colaboração e responsabilidade compartilhada.'
  },
  {
    category: 'ORIGEM', kind: 'MÚLTIPLA ESCOLHA', title: 'Quando surgiu o movimento DevOps?',
    prompt: 'De acordo com o material, em que ano o movimento DevOps surgiu aproximadamente?', type: 'single',
    options: ['2005', '2007', '2009', '2013'], correct: 2,
    explanation: 'O material situa o surgimento do movimento DevOps por volta de 2009. Entre os nomes associados ao início do movimento estão Patrick Debois e John Willis.'
  },
  {
    category: 'MODELO CAMS', kind: 'RELACIONAR CONCEITOS', title: 'Monte o modelo CAMS',
    prompt: 'Clique em um dos quatro elementos à esquerda e depois selecione seu significado à direita. Relacione todos os pares.', type: 'match',
    pairs: [
      { term: 'C — Culture', def: 'Cultura e colaboração entre as equipes.' },
      { term: 'A — Automation', def: 'Automação para reduzir tarefas manuais.' },
      { term: 'M — Measurement', def: 'Medição dos resultados por meio de dados.' },
      { term: 'S — Sharing', def: 'Compartilhamento de informações e conhecimento.' }
    ],
    explanation: 'O modelo CAMS reúne quatro elementos da cultura DevOps: Culture, Automation, Measurement e Sharing — cultura, automação, medição e compartilhamento.'
  },
  {
    category: 'CULTURA DEVOPS', kind: 'MARQUE TODAS AS CORRETAS', title: 'O que faz parte dessa cultura?',
    prompt: 'A cultura DevOps vai além das ferramentas. Marque todas as práticas citadas no material.', type: 'multi',
    options: [
      'Colaboração e comunicação entre equipes.',
      'Compartilhamento de conhecimento.',
      'Responsabilidade compartilhada.',
      'Automação e feedback contínuo.',
      'Manter Desenvolvimento e Operações isolados.',
      'Busca por melhoria contínua.'
    ], correct: [0, 1, 2, 3, 5],
    explanation: 'O material destaca colaboração, comunicação, compartilhamento de conhecimento, responsabilidade compartilhada, automação, feedback contínuo e busca por melhoria. Trabalhar de forma isolada vai contra essa proposta.'
  },
  {
    category: 'CICLO DEVOPS', kind: 'ORGANIZE AS ETAPAS', title: 'Coloque o ciclo em ordem',
    prompt: 'Organize as etapas do ciclo DevOps. Use as setas para mover cada etapa para cima ou para baixo.', type: 'order',
    order: ['PLAN', 'CODE', 'BUILD', 'TEST', 'RELEASE', 'DEPLOY', 'OPERATE', 'MONITOR'],
    scrambled: ['DEPLOY', 'BUILD', 'PLAN', 'MONITOR', 'CODE', 'OPERATE', 'TEST', 'RELEASE'],
    explanation: 'O ciclo começa no planejamento (PLAN), passa por programação, construção, testes, entrega e implantação. Depois o software é operado e monitorado; as informações do monitoramento alimentam novas melhorias.'
  },
  {
    category: 'CI/CD', kind: 'CLASSIFIQUE AS SITUAÇÕES', title: 'CI ou CD: identifique a prática',
    prompt: 'Leia cada situação e escolha a prática de CI/CD correspondente.', type: 'classify',
    choices: ['CI — Integração Contínua', 'CD — Entrega Contínua', 'CD — Implantação Contínua'],
    rows: [
      { text: 'As alterações de código são integradas e testes automáticos são executados para encontrar erros rapidamente.', correct: 0 },
      { text: 'O software permanece testado e pronto para ser publicado de forma controlada.', correct: 1 },
      { text: 'As alterações aprovadas são publicadas automaticamente no ambiente de produção.', correct: 2 }
    ],
    explanation: 'CI integra alterações e executa testes automáticos. Continuous Delivery mantém o software pronto para publicação controlada. Continuous Deployment publica automaticamente as alterações aprovadas em produção.'
  },
  {
    category: 'FERRAMENTAS', kind: 'RELACIONAR FERRAMENTAS', title: 'Cada ferramenta no seu papel',
    prompt: 'Selecione a função que corresponde a cada ferramenta ou prática apresentada.', type: 'tools',
    rows: [
      { name: 'Git', desc: 'Registra alterações no código e permite trabalho colaborativo.', correct: 0 },
      { name: 'Docker', desc: 'Empacota a aplicação e suas dependências em contêineres.', correct: 1 },
      { name: 'GitHub Actions / GitLab CI', desc: 'Executa tarefas automáticas, como testes e etapas de publicação.', correct: 2 },
      { name: 'Monitoramento', desc: 'Acompanha desempenho, disponibilidade e erros após a publicação.', correct: 3 }
    ],
    options: [
      'Controle de versão',
      'Contêineres',
      'Automação de tarefas',
      'Acompanhamento da aplicação'
    ],
    explanation: 'Git registra versões e alterações; Docker empacota a aplicação e dependências; GitHub Actions/GitLab CI automatizam tarefas; monitoramento acompanha a aplicação depois de publicada.'
  },
  {
    category: 'APLICAÇÃO PRÁTICA', kind: 'SIMULADOR DE MISSÃO', title: 'Coloque o site no ar',
    prompt: 'Você faz parte de uma equipe que precisa atualizar um site. Tome as decisões certas para concluir o processo DevOps.', type: 'sim',
    steps: [
      { situation: 'Você alterou uma funcionalidade do site. Qual é o próximo passo?', options: ['Registrar as alterações com Git e enviá-las ao repositório.', 'Publicar imediatamente a pasta do projeto, sem registrar as mudanças.', 'Iniciar o monitoramento antes de salvar o código.'], correct: 0, feedback: 'O Git registra as alterações do código e permite enviá-las ao repositório para o trabalho compartilhado.' },
      { situation: 'O código foi enviado. Onde a equipe mantém o repositório compartilhado?', options: ['No Docker, que serve como repositório de código.', 'No GitHub, que armazena o código compartilhado pela equipe.', 'No monitoramento, que guarda versões do projeto.'], correct: 1, feedback: 'O GitHub armazena o código compartilhado pela equipe. Git faz o controle de versão; GitHub hospeda o repositório.' },
      { situation: 'O código está no GitHub. O que deve verificar possíveis erros automaticamente?', options: ['O Git, que publica o site sozinho.', 'O Docker, que substitui os testes.', 'O GitHub Actions, executando testes automáticos.'], correct: 2, feedback: 'GitHub Actions pode executar testes automaticamente para verificar possíveis erros antes da publicação.' },
      { situation: 'As verificações foram aprovadas. Qual etapa publica a aplicação no ambiente configurado?', options: ['Deploy.', 'Compartilhamento.', 'Planejamento.'], correct: 0, feedback: 'Com as verificações aprovadas, o Deploy publica a aplicação no ambiente configurado.' },
      { situation: 'O site foi publicado. O que a equipe deve fazer em seguida?', options: ['Encerrar a colaboração, pois o trabalho terminou.', 'Acompanhar o funcionamento e identificar possíveis problemas.', 'Apagar o histórico de alterações do Git.'], correct: 1, feedback: 'Após a publicação, a equipe monitora o funcionamento do site e identifica possíveis problemas. Esse retorno pode orientar novas melhorias.' }
    ],
    explanation: 'A aplicação prática apresentada no material segue este fluxo: Código → Git → GitHub → GitHub Actions → Deploy → Monitoramento. O resultado é um processo mais rápido, automatizado e confiável, com colaboração entre Desenvolvimento e Operações.'
  },
  {
    category: 'DESAFIO FINAL', kind: 'REVISÃO GERAL', title: 'Qual é o verdadeiro objetivo?',
    prompt: 'Para fechar a missão: qual alternativa resume melhor o objetivo principal da cultura DevOps?', type: 'single',
    options: [
      'Adotar o maior número possível de ferramentas de automação, independentemente da equipe.',
      'Substituir a equipe de operações por processos automáticos.',
      'Aproximar equipes e processos para entregar software de forma mais rápida, frequente e confiável.',
      'Concentrar todas as etapas do desenvolvimento em uma única pessoa.'
    ], correct: 2,
    explanation: 'DevOps é principalmente uma mudança na maneira como as equipes trabalham. Ferramentas ajudam, mas a base é colaboração, responsabilidade compartilhada, automação, feedback e melhoria contínua.'
  }
];

const state = {
  index: 0,
  score: 0,
  answered: Array(questions.length).fill(false),
  results: Array(questions.length).fill(null),
  currentSelection: null,
  locked: false,
  matchSelected: null,
  matched: [],
  orderItems: [],
  simStep: 0,
  simAllCorrect: true,
  simLocked: false,
  sound: false
};

const audioContext = window.AudioContext ? new AudioContext() : null;
function playTone(freq = 520, duration = .08, type = 'sine') {
  if (!state.sound || !audioContext) return;
  if (audioContext.state === 'suspended') audioContext.resume();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type; oscillator.frequency.value = freq;
  gain.gain.setValueAtTime(.035, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
  oscillator.connect(gain); gain.connect(audioContext.destination);
  oscillator.start(); oscillator.stop(audioContext.currentTime + duration);
}

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function updateProgress() {
  const n = state.index + 1;
  $('#missionCount').textContent = `${String(n).padStart(2,'0')}—10`;
  $('#progressFill').style.width = `${(n / questions.length) * 100}%`;
  $('#progressPercent').textContent = `${Math.round((n / questions.length) * 100)}% concluído`;
  $('#scoreLive').textContent = state.score;
  document.querySelectorAll('.mission-item').forEach((item, i) => {
    item.classList.toggle('current', i === state.index);
    item.classList.toggle('done', state.answered[i]);
  });
}
function setupQuestion() {
  const q = questions[state.index];
  state.currentSelection = null; state.locked = false; state.matchSelected = null; state.matched = []; state.verifyHandler = null;
  state.simStep = 0; state.simAllCorrect = true; state.simLocked = false;
  $('#questionCategory').textContent = q.category;
  $('#questionKind').textContent = q.kind;
  $('#questionNumber').textContent = `DESAFIO ${String(state.index + 1).padStart(2,'0')}`;
  $('#questionTitle').textContent = q.title;
  $('#questionPrompt').textContent = q.prompt;
  $('#questionDecoration').textContent = String(state.index + 1).padStart(2,'0');
  $('#feedbackBox').hidden = true; $('#feedbackBox').classList.remove('error');
  $('#nextButton').disabled = true; $('#nextButton').textContent = 'Confirmar resposta →';
  $('#nextButton').innerHTML = 'Confirmar resposta <span class="button-arrow">→</span>';
  $('#actionHint').textContent = 'Complete a atividade para continuar.';
  $('#activityContainer').innerHTML = '';
  updateProgress();
  switch (q.type) {
    case 'single': renderSingle(q); break;
    case 'multi': renderMulti(q); break;
    case 'match': renderMatch(q); break;
    case 'order': renderOrder(q); break;
    case 'classify': renderClassify(q); break;
    case 'tools': renderTools(q); break;
    case 'sim': renderSimulator(q); break;
  }
}
function makeFeedback(correct, text) {
  const box = $('#feedbackBox');
  box.hidden = false; box.classList.toggle('error', !correct);
  $('#feedbackIcon').textContent = correct ? '✓' : '!';
  $('#feedbackTitle').textContent = correct ? 'Resposta correta!' : 'Quase lá!';
  $('#feedbackText').textContent = text;
}
function finishQuestion(correct, explanation) {
  if (state.answered[state.index]) return;
  state.answered[state.index] = true;
  state.results[state.index] = correct;
  if (correct) { state.score += 1; playTone(700, .12); } else { playTone(220, .12, 'triangle'); }
  $('#scoreLive').textContent = state.score;
  makeFeedback(correct, explanation);
  $('#nextButton').style.display = 'inline-flex';
  $('#nextButton').disabled = false;
  $('#nextButton').innerHTML = state.index === questions.length - 1 ? 'Ver resultado <span class="button-arrow">→</span>' : 'Próximo desafio <span class="button-arrow">→</span>';
  $('#actionHint').textContent = correct ? 'Boa! Continue para o próximo desafio.' : 'Confira a explicação e siga em frente.';
  updateProgress();
}
function renderSingle(q) {
  const grid = document.createElement('div'); grid.className = 'option-grid';
  q.options.forEach((text, i) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'option-card';
    button.innerHTML = `<span class="option-letter">${String.fromCharCode(65+i)}</span><span class="option-text"></span>`;
    button.querySelector('.option-text').textContent = text;
    button.addEventListener('click', () => {
      if (state.locked) return;
      state.locked = true;
      const correct = i === q.correct;
      [...grid.children].forEach((el, j) => {
        el.disabled = true;
        if (j === q.correct) el.classList.add('correct');
        else if (j === i) el.classList.add('wrong');
      });
      finishQuestion(correct, q.explanation);
    });
    grid.appendChild(button);
  });
  $('#activityContainer').appendChild(grid);
}
function renderMulti(q) {
  const hint = document.createElement('p'); hint.className = 'activity-instruction'; hint.textContent = 'Você pode marcar mais de uma alternativa. Depois, confirme sua seleção.';
  const grid = document.createElement('div'); grid.className = 'option-grid';
  const selected = new Set();
  q.options.forEach((text, i) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'option-card multi-option';
    button.innerHTML = `<span class="option-letter">□</span><span class="option-text"></span>`;
    button.querySelector('.option-text').textContent = text;
    button.addEventListener('click', () => {
      if (state.locked) return;
      if (selected.has(i)) selected.delete(i); else selected.add(i);
      button.classList.toggle('selected', selected.has(i));
      button.querySelector('.option-letter').textContent = selected.has(i) ? '✓' : '□';
      $('#nextButton').disabled = selected.size === 0;
    });
    grid.appendChild(button);
  });
  $('#activityContainer').append(hint, grid);
  $('#nextButton').disabled = true;
  state.verifyHandler = () => {
    if (state.locked || selected.size === 0) return;
    state.locked = true;
    const expected = new Set(q.correct);
    const correct = selected.size === expected.size && [...selected].every(v => expected.has(v));
    [...grid.children].forEach((el, i) => {
      el.disabled = true;
      if (expected.has(i)) el.classList.add('correct');
      else if (selected.has(i)) el.classList.add('wrong');
    });
    finishQuestion(correct, q.explanation);
  };
}
function verify() { if (state.verifyHandler && !state.locked) state.verifyHandler(); }
function renderMatch(q) {
  const layout = document.createElement('div'); layout.className = 'match-layout';
  const left = document.createElement('div'), right = document.createElement('div');
  left.innerHTML = '<div class="match-column-title">ELEMENTOS</div><div class="match-list" id="matchTerms"></div>';
  right.innerHTML = '<div class="match-column-title">SIGNIFICADOS</div><div class="match-list" id="matchDefs"></div>';
  layout.append(left, right); $('#activityContainer').appendChild(layout);
  const terms = $('#matchTerms'), defs = $('#matchDefs');
  const termOrder = q.pairs.map((p,i) => i);
  const defOrder = [2,0,3,1];
  termOrder.forEach(i => {
    const b = document.createElement('button'); b.className = 'match-item'; b.textContent = q.pairs[i].term; b.dataset.index = i;
    b.addEventListener('click', () => {
      if (state.matched.includes(i)) return;
      state.matchSelected = i;
      [...terms.children].forEach(el => el.classList.toggle('selected', Number(el.dataset.index) === i));
    }); terms.appendChild(b);
  });
  defOrder.forEach(i => {
    const b = document.createElement('button'); b.className = 'match-item'; b.textContent = q.pairs[i].def; b.dataset.index = i;
    b.addEventListener('click', () => {
      if (state.matchSelected === null || state.matched.includes(i)) return;
      const picked = state.matchSelected;
      if (picked === i) {
        state.matched.push(i);
        terms.querySelector(`[data-index="${i}"]`).classList.add('matched');
        terms.querySelector(`[data-index="${i}"]`).classList.remove('selected');
        b.classList.add('matched');
        playTone(600, .07);
        state.matchSelected = null;
        [...terms.children].forEach(el => el.classList.remove('selected'));
        counter.textContent = `${state.matched.length}/4 pares encontrados`;
        if (state.matched.length === 4) finishQuestion(true, q.explanation);
      } else {
        b.classList.add('wiggle');
        setTimeout(() => b.classList.remove('wiggle'), 350);
        playTone(190, .08, 'triangle');
      }
    }); defs.appendChild(b);
  });
  const counter = document.createElement('div'); counter.className = 'match-counter'; counter.textContent = '0/4 pares encontrados'; $('#activityContainer').appendChild(counter);
  $('#actionHint').textContent = 'Encontre os quatro pares corretos.';
}
function renderOrder(q) {
  state.orderItems = [...q.scrambled];
  const note = document.createElement('p'); note.className = 'activity-instruction'; note.textContent = 'Dica: comece pelo planejamento e termine observando o funcionamento do software.';
  const list = document.createElement('div'); list.className = 'order-list';
  function draw() {
    list.innerHTML = '';
    state.orderItems.forEach((name, i) => {
      const row = document.createElement('div'); row.className = 'order-item';
      row.innerHTML = `<span class="order-position">${String(i+1).padStart(2,'0')}</span><span class="order-name">${name}</span><span class="order-controls"><button type="button" class="move-button" aria-label="Mover ${name} para cima" ${i===0?'disabled':''}>↑</button><button type="button" class="move-button" aria-label="Mover ${name} para baixo" ${i===state.orderItems.length-1?'disabled':''}>↓</button></span>`;
      const [up,down] = row.querySelectorAll('button');
      up.addEventListener('click', () => { [state.orderItems[i-1],state.orderItems[i]]=[state.orderItems[i],state.orderItems[i-1]]; draw(); });
      down.addEventListener('click', () => { [state.orderItems[i+1],state.orderItems[i]]=[state.orderItems[i],state.orderItems[i+1]]; draw(); });
      list.appendChild(row);
    });
  }
  draw(); $('#activityContainer').append(note,list);
  $('#nextButton').disabled = false; $('#nextButton').innerHTML = 'Verificar sequência <span class="button-arrow">→</span>';
  state.verifyHandler = () => {
    if (state.locked) return; state.locked = true;
    const correct = state.orderItems.every((v,i) => v === q.order[i]);
    if (!correct) {
      const answer = q.order.join(' → ');
      finishQuestion(false, `${q.explanation} A sequência correta é: ${answer}.`);
    } else finishQuestion(true, q.explanation);
  };
}
function renderClassify(q) {
  const list = document.createElement('div'); list.className = 'select-task-list';
  const selects=[];
  q.rows.forEach((row,i) => {
    const wrap = document.createElement('div'); wrap.className = 'select-task-row';
    const p = document.createElement('p'); p.textContent = `${i+1}. ${row.text}`;
    const select = document.createElement('select'); select.innerHTML = '<option value="">Selecione a prática...</option>';
    q.choices.forEach((choice,j) => { const op=document.createElement('option'); op.value=j; op.textContent=choice; select.appendChild(op); });
    select.addEventListener('change', () => { $('#nextButton').disabled = selects.some(s => !s.value); });
    selects.push(select); wrap.append(p,select); list.appendChild(wrap);
  });
  $('#activityContainer').appendChild(list); $('#nextButton').disabled = true; $('#nextButton').innerHTML = 'Verificar classificações <span class="button-arrow">→</span>';
  state.verifyHandler = () => {
    if (state.locked) return; state.locked=true;
    const correct = q.rows.every((r,i) => Number(selects[i].value) === r.correct);
    selects.forEach((s,i) => { s.disabled=true; s.style.borderColor = Number(s.value)===q.rows[i].correct ? '#9bbfa8' : '#d6a0a7'; });
    finishQuestion(correct,q.explanation);
  };
}
function renderTools(q) {
  const list = document.createElement('div'); list.className = 'select-task-list';
  const selects=[];
  q.rows.forEach((row,i) => {
    const wrap=document.createElement('div'); wrap.className='select-task-row';
    const p=document.createElement('p'); p.innerHTML=`<b>${row.name}</b> — ${row.desc}`;
    const select=document.createElement('select'); select.innerHTML='<option value="">Escolha a categoria...</option>';
    q.options.forEach((choice,j)=>{const op=document.createElement('option');op.value=j;op.textContent=choice;select.appendChild(op);});
    select.addEventListener('change',()=>{$('#nextButton').disabled=selects.some(s=>!s.value);});
    selects.push(select);wrap.append(p,select);list.appendChild(wrap);
  });
  $('#activityContainer').appendChild(list);$('#nextButton').disabled=true;$('#nextButton').innerHTML='Verificar associações <span class="button-arrow">→</span>';
  state.verifyHandler=()=>{
    if(state.locked)return;state.locked=true;
    const correct=q.rows.every((r,i)=>Number(selects[i].value)===r.correct);
    selects.forEach((s,i)=>{s.disabled=true;s.style.borderColor=Number(s.value)===q.rows[i].correct?'#9bbfa8':'#d6a0a7';});
    finishQuestion(correct,q.explanation);
  };
}
function renderSimulator(q) {
  const box=document.createElement('div');box.className='simulator';$('#activityContainer').appendChild(box);
  function drawStep() {
    const step=q.steps[state.simStep];
    box.innerHTML='';
    const top=document.createElement('div');top.className='sim-top';top.innerHTML=`<span class="sim-tag">PIPELINE DO SITE</span><span class="sim-step-count">ETAPA ${state.simStep+1} / ${q.steps.length}</span>`;
    const track=document.createElement('div');track.className='sim-track';
    q.steps.forEach((_,i)=>{const segment=document.createElement('span');if(i<state.simStep)segment.classList.add('passed');if(i===state.simStep)segment.classList.add('active');track.appendChild(segment);});
    const prompt=document.createElement('div');prompt.className='sim-question';prompt.textContent=step.situation;
    const options=document.createElement('div');options.className='sim-options';
    const feedback=document.createElement('div');feedback.className='sim-feedback';feedback.hidden=true;
    step.options.forEach((label,i)=>{
      const b=document.createElement('button');b.type='button';b.className='sim-option';b.textContent=label;
      b.addEventListener('click',()=>{
        if(state.simLocked)return;state.simLocked=true;
        const ok=i===step.correct;if(!ok)state.simAllCorrect=false;
        [...options.children].forEach((el,j)=>{el.disabled=true;if(j===step.correct)el.classList.add('picked-correct');else if(j===i)el.classList.add('picked-wrong');});
        feedback.hidden=false;feedback.classList.toggle('bad',!ok);feedback.textContent=(ok?'✓ ':'! ')+step.feedback;
        next.disabled=false;next.textContent=state.simStep===q.steps.length-1?'Finalizar simulação':'Próxima etapa →';
      });options.appendChild(b);
    });
    const next=document.createElement('button');next.type='button';next.className='primary-button';next.disabled=true;next.style.marginTop='13px';
    next.addEventListener('click',()=>{
      if(state.simStep<q.steps.length-1){state.simStep++;state.simLocked=false;drawStep();}
      else {state.locked=true;finishQuestion(state.simAllCorrect,q.explanation);}
    });
    box.append(top,track,prompt,options,feedback,next);
  }
  drawStep();
  $('#actionHint').textContent='Complete as cinco etapas do processo.';
  $('#nextButton').style.display='none';
}

$('#startButton').addEventListener('click',()=>{state.index=0;state.score=0;state.answered.fill(false);state.results.fill(null);$('#nextButton').style.display='inline-flex';showScreen('quiz');setupQuestion();});
$('#nextButton').addEventListener('click',()=>{
  const q=questions[state.index];
  if(state.answered[state.index]) {
    if(state.index<questions.length-1){state.index++;setupQuestion();}
    else showResults();
    return;
  }
  if(q.type==='multi'||q.type==='order'||q.type==='classify'||q.type==='tools'){verify();return;}
});
function showResults(){
  $('#finalScore').textContent=state.score;$('#finalPercent').textContent=`${state.score*10}%`;
  let title='Missão concluída!',description='Você percorreu os principais conceitos da cultura DevOps.',message='Continue praticando: colaboração e melhoria contínua também fazem parte do aprendizado.';
  if(state.score===10){title='Excelente trabalho!';description='Você dominou todos os desafios desta missão.';message='Desempenho perfeito! Você conectou os conceitos e aplicou o fluxo DevOps do início ao monitoramento.';}
  else if(state.score>=7){title='Muito bem, equipe!';description='Você demonstrou um ótimo entendimento da cultura DevOps.';message='Você está no caminho certo. Revise os desafios em que teve dúvidas para consolidar o conhecimento.';}
  else if(state.score>=4){title='Boa evolução!';description='Você já reconhece vários elementos importantes do DevOps.';message='Vale revisar o modelo CAMS, o ciclo e as diferenças entre as etapas de CI/CD.';}
  else {title='Toda missão ensina!';description='Agora você já sabe quais conceitos merecem uma nova revisão.';message='Releia os feedbacks e tente novamente. O objetivo é aprender como as etapas e as equipes trabalham juntas.';}
  $('#resultTitle').textContent=title;$('#resultDescription').textContent=description;$('#resultMessage').textContent=message;
  showScreen('result');
}
$('#restartButton').addEventListener('click',()=>{state.index=0;state.score=0;state.answered.fill(false);state.results.fill(null);showScreen('quiz');$('#nextButton').style.display='inline-flex';setupQuestion();});
$('#reviewButton').addEventListener('click',()=>{showScreen('start');});
$('#soundToggle').addEventListener('click',()=>{state.sound=!state.sound;$('#soundIcon').textContent=state.sound?'♪':'♫';$('#soundToggle').style.background=state.sound?'#eee2f1':'';if(state.sound)playTone(660,.09);});

