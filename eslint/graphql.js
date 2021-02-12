module.exports = {
  plugins: [
    'graphql',
    '@habx/graphql-multi-endpoints',
  ],
  rules: {
    '@habx/graphql-multi-endpoints/api-directive': 'error',

    'graphql/no-deprecated-fields': 'error',
    'graphql/required-fields': ['warn', {
      requiredFields: ['id'],
    }],
    'graphql/template-strings': ['error', {
      validators: [
        'ExecutableDefinitionsRule',
        'FieldsOnCorrectTypeRule',
        'FragmentsOnCompositeTypesRule',
        'KnownArgumentNamesRule',
        'KnownDirectivesRule',
        'KnownTypeNamesRule',
        'LoneAnonymousOperationRule',
        'NoFragmentCyclesRule',
        'NoUnusedVariablesRule',
        'OverlappingFieldsCanBeMergedRule',
        'PossibleFragmentSpreadsRule',
        'ScalarLeafsRule',
        'SingleFieldSubscriptionsRule',
        'UniqueArgumentNamesRule',
        'UniqueDirectivesPerLocationRule',
        'UniqueFragmentNamesRule',
        'UniqueInputFieldNamesRule',
        'UniqueOperationNamesRule',
        'UniqueVariableNamesRule',
        'ValuesOfCorrectTypeRule',
        'VariablesAreInputTypesRule',
        'VariablesInAllowedPositionRule',
      ],
    }]
  }
}
