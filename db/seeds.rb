# frozen_string_literal: true

seed_once(Topic, name: 'Typography')
seed_once(Topic, name: 'Design Principles')
seed_once(Topic, name: 'Sketch')
seed_once(Topic, name: 'UI Elements')
seed_once(Topic, name: 'Information Architechture')
seed_once(Topic, name: 'Design Systems')
seed_once(Topic, name: 'Desing Masters')
seed_once(Topic, name: 'Copywritting')
seed_once(Topic, name: 'Icons')

seed_once(Link, title: 'flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', notes: 'Recommendation', topic_id: 4)
seed_once(Link, title: 'css tricks', url: 'https://css-tricks.com/', notes: 'Hint', topic_id: 4)
seed_once(Link, title: 'Example 1', url: 'https://example1.com', notes: '', topic_id: 1)
seed_once(Link, title: 'Example 2', url: 'https://example2.com', notes: '', topic_id: 3)
seed_once(Link, title: 'Example 3', url: 'https://example3.com', notes: '', topic_id: 6)
seed_once(Link, title: 'Example 4', url: 'https://example4.com', notes: '', topic_id: 5)
seed_once(Link, title: 'Example 5', url: 'https://example5.com', notes: '', topic_id: 6)
