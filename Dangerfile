unless gitlab.mr_body =~ %r{/issues/\d+} || gitlab.mr_body =~ %r{#\d+}
  warn 'This merge request does not reference any issues. Please add an ' \
    'issue reference to the Description.'
end
